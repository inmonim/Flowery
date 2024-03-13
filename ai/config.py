with open('.env', 'r', encoding='utf-8') as f:
    conf = f.read()

user = conf.user
password = conf.password
host = conf.host
port = conf.port
database = conf.database

SQLALCHEMY_DATABASE_URI = f'mysql+pymysql://{user}:{password}@{host}:{port}/{database}?charset=utf8mb4'
SQLALCHEMY_TRACK_MODIFICATIONS = False
UPLOAD_FOLDER = 'tmp'

AWS_ACCESS_KEY_ID = conf.aws_access_key_id
AWS_SECRET_ACCESS_KEY = conf.aws_secret_access_key
BUCKET_NAME = conf.AWS_BUCKEY_NAME
LOCAL = conf.AWS_LOCAL