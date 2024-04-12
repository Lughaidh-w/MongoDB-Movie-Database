import os
from dotenv import load_dotenv


def load_env_vars():
    current_dir = os.path.dirname(os.path.abspath(__file__))
    parent_dir = os.path.dirname(current_dir)

    dotenv_path = os.path.join(parent_dir, '.env')
    load_dotenv(dotenv_path)