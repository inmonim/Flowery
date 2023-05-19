user = 'root'
password = 'Sw3lOZMzHc'
host = 'k8e107.p.ssafy.io'
port = 3306
database = 'flowery'

SQLALCHEMY_DATABASE_URI = f'mysql+pymysql://{user}:{password}@{host}:{port}/{database}?charset=utf8mb4'
SQLALCHEMY_TRACK_MODIFICATIONS = False
UPLOAD_FOLDER = 'tmp'