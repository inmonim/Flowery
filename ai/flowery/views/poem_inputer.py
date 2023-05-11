from flask import Flask, Blueprint, request, Response, json



bp = Blueprint('poem_inputer.py', __name__, url_prefix='/poem')

@bp.route('/maker', methods=['POST'])
def poem_maker():
    
    request.