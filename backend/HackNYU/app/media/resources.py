from app.account.decorators import login_required
from app.media import media_ns
import service as media_service
from app.media.media_model import MediaModel
from app.parameters.media import media_upload_param
from app.schemas.media import media_upload_schema, media_schema, media_list_schema

from app.values.error_strings import ErrorString
from app.values.error_tokens import ErrorToken
from extensions.decorators import get_model_by_id, ModelByIdError
from extensions.parameters import pagination
from flask_restplus import Resource


@media_ns.route('')
class Media(Resource):
    @media_ns.doc('upload_url', id="upload")
    @login_required
    @media_ns.expect(media_upload_param)
    @media_ns.marshal_with(media_upload_schema)
    def post(self, account):
        """
        Get upload url
        :param account: 
        :param friend_profile: 
        :return: 
        """
        return media_service.generate_upload_url(account)

    @media_ns.doc('list', id="list")
    @login_required
    @media_ns.expect(pagination)
    @media_ns.marshal_with(media_list_schema)
    def get(self, account):
        """
        List all account media
        :param account: 
        :return: 
        """
        return media_service.list_media(account)


media_error = ModelByIdError(
    ErrorToken.MediaNotFound,
    ErrorString.MediaNotFound
)


@media_ns.route('/<int:mediaId>')
class MediaGet(Resource):
    @media_ns.doc('get', id="getPhoto")
    @login_required
    @get_model_by_id(MediaModel, 'media', media_error, 'mediaId')
    @media_ns.marshal_with(media_schema)
    def get(self, account, media):
        """
        Get Media model
        :param account: 
        :param media: 
        :return: 
        """
        return media
