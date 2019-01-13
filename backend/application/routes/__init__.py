from flask import Blueprint
routes = Blueprint('routes', __name__)

from .index import *
from .users import *
from .auth import *
