import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY')
    CHAIN_URL = "127.0.0.1:7545"
