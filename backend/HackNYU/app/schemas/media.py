from app import app_ns
from extensions.schemas import make_pagination_schema
from flask_restplus import fields

media_schema = app_ns.model('Media', {
    'id': fields.Integer(),
    'filename': fields.String(),
    'data': fields.Raw(),
    'mediaType': fields.String(attribute='media_type'),
    'contentType': fields.String(attribute='content_type'),
    'isPublic': fields.Boolean(attribute='is_public'),
    'url': fields.String()
})

media_upload_schema = app_ns.model('MediaUpload', {
    'key': fields.String(),
    'url': fields.String(),
    'bucket': fields.String(),
    'contentType': fields.String(),
    'googleAccessId': fields.String(),
    'acl': fields.String(),
    'signature': fields.String(),
    'policy': fields.String(),
    'media': fields.Nested(media_schema)
})

media_list_schema = make_pagination_schema(app_ns, 'MediaList', {
    'items': fields.List(fields.Nested(media_schema))
})