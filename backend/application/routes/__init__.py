"""Author: Jarand Nikolai Jansen"""
from flask import Blueprint

from .index import *
from .users import *
from .auth import *

routes = Blueprint('routes', __name__)
