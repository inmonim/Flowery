import torch
from PIL import Image

from sqlalchemy import create_engine, Table, MetaData

def engine():
    user = 'root'
    password = 'Sw3lOZMzHc'
    host = 'k8e107.p.ssafy.io'
    port = 3306
    database = 'flowery'

    SQLALCHEMY_DATABASE_URI = f'mysql+pymysql://{user}:{password}@{host}:{port}/{database}?charset=utf8mb4'
    engine = create_engine(url=SQLALCHEMY_DATABASE_URI)
    
    return engine.connect()

def get_flower_dict():
    metadata = MetaData()
    conn = engine()
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

model_flower_label, flower_name_dict = get_flower_dict()

model = torch.hub.load('ultralytics/yolov5', 'custom', path=f'./flowery/module/main_5_3_15.pt', force_reload=True, trust_repo=True)

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