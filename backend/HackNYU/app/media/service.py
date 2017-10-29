import base64
import hashlib
import time
import urllib
from datetime import datetime, timedelta

from google.appengine.ext import ndb

from app.media.media_model import MediaModel, MediaType
from app.parameters.media import media_upload_param
from app.values.error_tokens import ErrorToken
from config import config
from extensions.bh_api import bh_abort
from extensions.decorators import parse_params
from extensions.parameters import pagination
from oauth2client.service_account import ServiceAccountCredentials


@parse_params(media_upload_param)
def generate_upload_url(account, filename, media_type, content_type, data=None, is_public=False):
    return _generate_upload_url(account, filename, media_type, content_type, data, is_public)


def generate_unique_upload_folder(account, content_type, filename):
    unique_folder = hashlib.sha224("%s-%s-%s" % (account.id, time.time(), filename)).hexdigest()
    file_path = 'content/%s/%s/%s/%s' % (account.id, content_type, unique_folder, filename)
    return '%s/%s' % (config.Google.storage_bucket, file_path), file_path


def generate_upload_policy_document(media_type, key, expiration=None):
    expiration = expiration or (datetime.utcnow() + timedelta(seconds=config.Google.upload_url_expiry))
    expiration = expiration.isoformat() + 'Z'
    return '{"expiration": "%s", "conditions": [{"bucket": "%s"}, ' \
           '["eq", "$key", "%s"], {"acl": "%s"}, ' \
           '["starts-with", "$Content-Type", "%s"], ' \
           '["content-length-range", 0, %s]]}' % (
               expiration, config.Google.storage_bucket, key,
               config.Google.default_acl, MediaType.get_content_type(media_type),
               MediaType.get_content_max_length(media_type))


def sign_policy(policy):
    creds = ServiceAccountCredentials.from_json_keyfile_name(config.Google.service_key_json)
    policy_b64 = base64.b64encode(policy)
    signature = base64.b64encode(creds.sign_blob(policy_b64)[1])
    return creds.service_account_email, policy_b64, signature


def _generate_upload_url(account, filename, media_type, content_type, data=None, is_public=False):

    filename = urllib.quote_plus(filename)
    file_key, file_path = generate_unique_upload_folder(account, content_type, filename)

    if not content_type.startswith(MediaType.get_content_type(media_type)):
        return bh_abort(400, ErrorToken.InvalidContentType)

    media_model = MediaModel(
        creator_key=account.key,
        store_path=file_path,
        filename=filename,
        data=data or {},
        content_type=content_type,
        media_type=media_type,
        is_public=is_public
    )
    media_model.put()

    service_account_id, policy, signature = sign_policy(generate_upload_policy_document(media_type, file_key))

    return {
        'key': file_key,
        'url': config.Google.storage_url,
        'bucket': config.Google.storage_bucket,
        'contentType': content_type,
        'googleAccessId': service_account_id,
        'acl': config.Google.default_acl,
        'signature': signature,
        'policy': policy,
        "media": media_model,
    }


def _list_media(account, **pagination):
    return MediaModel.paginate(
        filters=[
            ndb.FilterNode('creator_key', '=', account.key)
        ],
        **pagination
    )


@parse_params(pagination)
def list_media(account, **pagination):
    return _list_media(account, **pagination)
