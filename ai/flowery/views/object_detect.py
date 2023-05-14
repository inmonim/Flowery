from flask import Flask, Blueprint, request, Response, json, g
import boto3
from werkzeug.utils import secure_filename

import random, os, uuid

from flowery.module.model import get_result, make_poem, model_flower_label, flower_name_dict, flower_lang
from flowery.models import Sales

from flowery import db

bp = Blueprint('object_detect', __name__, url_prefix='/flask/')

s3 = boto3.client('s3',
                  aws_access_key_id='AKIA3FXULGKK3QVK3SOY',
                  aws_secret_access_key='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')

BUCKET_NAME = 's3.bucket.flowery.youngil'
LOCAL = 'ap-northeast-2'

@bp.route('/objectDetect', methods=['GET', 'POST'])
def object_detect():
    if request.method == 'GET':
        return 'POST 방식으로 접근하세용'
    
    elif request.method == 'POST':
        img = request.files['file']
        filename = secure_filename(img.filename)
        img_result = get_result(img)
        
        flower_result = {}
        for pred in img_result.pred[0]:
            flower_class = int(pred[5])
            if flower_result.get(model_flower_label[flower_class]):
                flower_result[model_flower_label[flower_class]] += 1
            else:
                flower_result[model_flower_label[flower_class]] = 1
        
        img_result.files[0] = filename
        
        img_result.save(save_dir=f'./tmp_img/{filename[:-4]}/')
        
        uuid_name = uuid.uuid1()
        
        s3.upload_file(
            Bucket = BUCKET_NAME,
            Filename=f'./tmp_img/{filename[:-4]}/{filename}',
            Key=f'object_detect/{uuid_name}.jpg'
        )
        os.remove(f'./tmp_img/{filename[:-4]}/{filename}')
        os.rmdir(f'./tmp_img/{filename[:-4]}')

        file_url = f"https://s3.{LOCAL}.amazonaws.com/{BUCKET_NAME}/object_detect/{uuid_name}.jpg"
        
        result = {'flower_object' : flower_result,
                  'file_url' : file_url,
                  'message' : '꽃을 탐지했습니다.'}
        
        if int(img_result.pred[0].sum()) == 0:
            result['message'] = '꽃이 탐지되지 않았습니다.'
            return Response(json.dumps(result, ensure_ascii=False),
                            headers=({'Access-Control-Allow-Origin': '*'}),
                            content_type='application/json; charset=utf-8',
                            status=200)
        
        response = Response(json.dumps(result, ensure_ascii=False),
                            headers=({'Access-Control-Allow-Origin': '*'}),
                            content_type='application/json; charset=utf-8',
                            status=200)
        return response
    
    
@bp.route('/saveSales', methods=['POST'])
def save_sales():
    if request.method == 'POST':
        
        res = request.get_json()
        
        flower_id_list = []
        
        for k,v in res['flower_object'].items():
            sales = Sales()
            sales.reservation_id = res['reservation_id']
            flower_id = flower_name_dict[k]
            sales.flower_id = flower_id
            sales.count = v
        
            db.session.add(sales)
            db.session.commit()
            
            flower_id_list.append(flower_id)
        
        flower_lang_list = []
        if len(flower_id_list) >= 2:
            flower_id, flower_id_2 = random.sample(flower_id_list, 2)
            flower_lang_list.extend(flower_lang[flower_id])
            flower_lang_list.extend(flower_lang[flower_id_2])
        else:
            flower_id = flower_id_list[0]
            flower_lang_list.extend(flower_lang[flower_id])
        
        f_lang_1, f_lang_2 = random.sample(flower_lang_list, 2)
            
        make_poem(f_lang_1, f_lang_2, res['reservation_id'], flower_id)
        
        response = Response(json.dumps({'message' : '입력 성공'}, ensure_ascii=False),
                            headers=({'Access-Control-Allow-Origin': '*'}),
                            content_type='application/json; charset=utf-8',
                            status=200)
        
        return response