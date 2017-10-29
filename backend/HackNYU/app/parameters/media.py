from app import app_ns
from flask_restplus import fields

media_upload_param = app_ns.model('MediaUploadParam', {
    'filename': fields.String(required=True),
    'contentType': fields.String(required=True),
    'mediaType': fields.String(required=True),
    'isPublic': fields.Boolean(default=False),
    'data': fields.Raw(),
})

media_id_param = app_ns.model('MediaIdParam', {
    'id': fields.Integer(required=True),
})