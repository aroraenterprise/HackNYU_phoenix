from app import app_ns
from app.parameters.media import media_id_param
from extensions.schemas import make_pagination_schema
from flask_restplus import fields

project_param = app_ns.model('ProjectParam', {
    'name': fields.String(required=True),
    'short': fields.String(required=True),
    'long': fields.String(),
    'website': fields.String(),
    'techStack': fields.String(repeated=True),
    'featuredVideo': fields.String(),
    'videos': fields.List(fields.String()),
    'files': fields.List(fields.Nested(media_id_param)),
    'images': fields.List(fields.Nested(media_id_param)),
    'featuredImage': fields.Nested(media_id_param),
    'logo': fields.Nested(media_id_param)
})