with open('.env', 'r', encoding='utf-8') as f:
    db_con = f.read()

user = db_con.user
password = db_con.password
host = db_con.host
port = db_con.port
database = db_con.database

SQLALCHEMY_DATABASE_URI = f'mysql+pymysql://{user}:{password}@{host}:{port}/{database}?charset=utf8mb4'
SQLALCHEMY_TRACK_MODIFICATIONS = False
UPLOAD_FOLDER = 'tmp'