from app import app_ns
from extensions.schemas import make_pagination_schema
from flask_restplus import fields

project_schema = app_ns.model('Project', {
    'id': fields.Integer()
})

project_list_schema = make_pagination_schema(app_ns, 'ProjectList', {
    'items': fields.List(fields.Nested(project_schema))
})