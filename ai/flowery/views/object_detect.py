from flask import Flask, Blueprint, request, Response, json
import os

from flowery.module.model import get_result, model_flower_label, flower_name_dict
from flowery.models import Sales

from flowery import db

bp = Blueprint('object_detect', __name__, url_prefix='/flask/')


@bp.route('/objectDetect', methods=['GET', 'POST'])
def object_detect():
    if request.method == 'GET':
        return '사진을 넣어주세양'
    
    elif request.method == 'POST':
        img = request.files['file']
        img_result = get_result(img)
        
        flower_result = {}
        for pred in img_result.pred[0]:
            flower_class = int(pred[5])
            if flower_result.get(model_flower_label[flower_class]):
                flower_result[model_flower_label[flower_class]] += 1
            else:
                flower_result[model_flower_label[flower_class]] = 1
        # result.show()
        
        result = {'flower_object' : flower_result}
        
        # os.remove(f'./tmp/{img.filename}')
        
        response = Response(json.dumps(result, ensure_ascii=False),
                            headers=({'Access-Control-Allow-Origin': '*'}),
                            content_type='application/json; charset=utf-8',
                            status=200)
        return response
    
    
@bp.route('/saveSales', methods=['POST'])
def save_sales():
    if request.method == 'POST':
        
        res = request.get_json()
        
        for k,v in res['flower_object'].items():
            sales = Sales()
            sales.reservation_id = res['reservation_id']
            flower_id = flower_name_dict[k]
            sales.flower_id = flower_id
            sales.count = v
        
            db.session.add(sales)
            db.session.commit()
            
        response = Response(json.dumps({'message' : '입력 성공'}, ensure_ascii=False),
                            headers=({'Access-Control-Allow-Origin': '*'}),
                            content_type='application/json; charset=utf-8',
                            status=200)
        return response