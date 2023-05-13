import os

import torch
from PIL import Image

from sqlalchemy import create_engine, Table, MetaData, text

def engine():
    user = 'root'
    password = 'Sw3lOZMzHc'
    host = 'k8e107.p.ssafy.io'
    port = 3306
    database = 'flowery'

    SQLALCHEMY_DATABASE_URI = f'mysql+pymysql://{user}:{password}@{host}:{port}/{database}?charset=utf8mb4'
    engine = create_engine(url=SQLALCHEMY_DATABASE_URI)
    
    return engine.connect()

conn = engine()

def get_flower_dict(conn):
    metadata = MetaData()
    flowers_table = Table('flowers', metadata, autoload_with=conn)
    flowers = conn.execute(flowers_table.select())
    model_flower_label = {
        0 : '장미',
        1 : 'empty',
        2 : '튤립',
        3 : '카네이션',
        4 : 'empty',
        5 : '백합',
        6 : '리시안셔스',
        7 : '소국',
        8 : '퐁퐁국화',
        9 : '해바라기',
        10 : '거베라',
        11 : '알스트로메리아',
        12 : '수국',
        13 : '작약',
        14 : '스토크',
        15 : '프리지아',
        16 : '라넌큘러스',
        17 : 'empty',
        18 : '버터플라이',
        19 : '칼라',
        20 : '금어초',
    }
    
    flower_list = [[k,v] for k,v in flowers]
    flower_name_dict = {i[1] : i[0] for i in flower_list}
    
    return [model_flower_label, flower_name_dict]

model_flower_label, flower_name_dict = get_flower_dict(conn)

model = torch.hub.load('ultralytics/yolov5', 'custom', path=f'./flowery/module/main_5_9.pt', force_reload=True, trust_repo=True)

def get_result(image_path, model=model):
    img = Image.open(image_path)
    x, y = img.size
    L, M = max(x,y), min(x,y)
    if x == L:
        img = img.resize([640,int(640/L * M)])
    else:
        img = img.resize([int(640/L * M), 640])
    results = model(img)
    if len(results.xywh[0]):
        
        xywhn_list = results.xywhn[0]
        del_idx = []
        for i in range(len(xywhn_list)-1):
            src = xywhn_list[i]
            for j in range(i+1, len(xywhn_list)):
                tar = xywhn_list[j]
                
                if abs(src[0] - tar[0]) <= 0.05 and abs(src[1] - tar[1]) <= 0.05:
                    if src[4] > tar[4]:
                        del_idx.append(j)
                    else:
                        del_idx.append(i)
            if src[4] < 0.3:
                del_idx.append(i)
        else:
            if xywhn_list[-1][4] < 0.3:
                del_idx.append(i+1)
            del_idx = sorted(list(set(del_idx)), reverse=True)
            for di in del_idx:
                if di == len(results.pred[0]):
                    results.pred[0] = results.pred[0][:di, :]
                else:
                    results.pred[0] = torch.cat((results.pred[0][:di, :], results.pred[0][di+1:, :]), dim=0)

    return results


import openai
import random


# current_directory = os.path.dirname(__file__)
# file_path = os.path.join(current_directory, 'openai_api_key.txt')

# with open(file_path, 'r') as f:
#     api_key = f.readline()

api_key = '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'
org_id = 'org-Qet9aDzXT2R98RAzCWgbUKtR'

openai.organization = org_id
openai.api_key = api_key


def make_poem(keyword1, keyword2, reservation_id, flower_id, conn=conn):
    
    k = keyword2[-1]
    
    josa = '을' if (ord(k)-44032)%28 else '를'

    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role":"user", "content": f"{keyword1}, {keyword2}{josa} 주제로 공백 포함 40글자 이내 짧은 시"}
        ]
    )
    
    poem = completion.choices[0].message.content
    
    message_id = conn.execute(text(f"SELECT message_id FROM reservation WHERE reservation_id = {reservation_id}")).one()[0]

    
    conn.execute(text(f"INSERT INTO poems (flower_id, poem) VALUES ({reservation_id}, '{poem}')"))

    conn.commit()
    
    poem_id = conn.execute(text(f'SELECT poem_id FROM poems ORDER BY poem_id DESC LIMIT 1')).one()[0]
 
    conn.execute(text(f"UPDATE messages SET poem_id = {poem_id} WHERE message_id = '{message_id}'"))
    
    flower_ids = conn.execute(text(f"SELECT mean_id FROM meaning WHERE flower_id = {flower_id}")).all()
    
    mean_id = random.choice(flower_ids)[0]
    
    conn.execute(text(f"UPDATE messages SET mean_id = {mean_id} WHERE message_id = '{message_id}'"))
    
    conn.commit()
    
def get_flower_lang(conn=conn):
    
    flower_lang_dict = {}
    
    results = conn.execute(text("SELECT * FROM meaning"))
    
    for _, flower_id, flower_lang in results:
        
        if flower_lang_dict.get(flower_id):
            flower_lang_dict[flower_id].append(flower_lang)
        
        else:
            flower_lang_dict[flower_id] = [flower_lang]
    
    return flower_lang_dict

flower_lang = get_flower_lang()