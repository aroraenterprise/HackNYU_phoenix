import base64
from urllib import urlencode

from config import config
from oauth2client.service_account import ServiceAccountCredentials

creds = None


def get_signed_url(resource_path, expiration):
    global creds
    if not creds:
        creds = ServiceAccountCredentials.from_json_keyfile_name(config.Google.service_key_json)
    resource_path = config.Google.storage_bucket + '/' + resource_path
    # Generate the string to sign.
    string_to_sign = '\n'.join([
        'GET',
        '',
        '',
        str(expiration),
        '/' + resource_path])

    signature_bytes = creds.sign_blob(string_to_sign)[1]
    signature = base64.b64encode(signature_bytes)
    service_account_name = creds.service_account_email

    query_params = {
        'GoogleAccessId': service_account_name,
        'Expires': str(expiration),
        'Signature': signature,
    }

    return '{endpoint}{resource}?{querystring}'.format(
        endpoint=config.Google.storage_url, resource=resource_path,
        querystring=urlencode(query_params))