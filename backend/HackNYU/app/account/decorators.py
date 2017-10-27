#!/usr/bin/env python
"""
/*
 * You can modify, copy and change any and all of the code
 * Just keep the header AS IS. You can add to it
 * Written by Saj Arora <saj.arora24@gmail.com>
 */
 
Project: HackNYU
Author: sajarora
Date: 2017-10-26
Description:
"""
import json
import logging
import urllib

from google.appengine.api import memcache

from app.account.account_model import AccountModel
from app.account.sub_model import SubModel
from config import config
from flask_restplus import reqparse, abort
from functools32 import wraps
from jose import jwt

Key_AuthO_JWKS = 'key-auth0-jwks'


def login_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = get_token_auth_header()
        payload = validate_token(token)
        if 'sub' not in payload:
            abort(401, "Invalid token. Missing sub.")
        sub_id = payload.get('sub')
        sub = SubModel.get_by_id(sub_id)
        if not sub:
            sub = SubModel.create(sub_id)
        if sub and sub.valid and sub.account.valid:
            return f(account=sub.account, *args, **kwargs)
        else:
            logging.error('Failure in login_required\npayload', json.dumps(payload), '. SubId: ', sub_id)
            return abort(500, message="Sorry, something went horribly wrong on our end. "
                                      "Contact us: %s if this problem persists" % config.support_email)

    return decorated


auth_parser = reqparse.RequestParser()
auth_parser.add_argument('X-API-KEY', help='Access Token', location='headers', required=True)


def handle_error(error, status_code):
    logging.error("Auth Error. %s: %s" % (error, status_code))
    abort(status_code, error)


def get_token_auth_header():
    """Obtains the access token from the Authorization Header
        """
    auth = auth_parser.parse_args().get('X-API-KEY')
    if not auth:
        return handle_error({"code": "authorization_header_missing",
                             "description":
                                 "Authorization header is expected"}, 401)
    parts = auth.split()

    if parts[0].lower() != "bearer":
        return handle_error({"code": "invalid_header",
                             "description":
                                 "Authorization header must start with"
                                 "Bearer"}, 401)
    elif len(parts) == 1:
        return handle_error({"code": "invalid_header",
                             "description": "Token not found"}, 401)
    elif len(parts) > 2:
        return handle_error({"code": "invalid_header",
                             "description": "Authorization header must be"
                                            "Bearer token"}, 401)

    token = parts[1]
    return token


def validate_token(token, force_refresh_jwks=False):
    jwks_refreshed = False
    try:
        jwks_json = memcache.get(Key_AuthO_JWKS)
        jwks = {}
        if force_refresh_jwks or not jwks_json:
            jwks_json = urllib.urlopen("https://" + config.Auth0.Domain + "/.well-known/jwks.json").read()
            memcache.set(Key_AuthO_JWKS, jwks_json)
            jwks_refreshed = True

        if jwks_json:
            jwks = json.loads(jwks_json)

        unverified_header = jwt.get_unverified_header(token)
        rsa_key = None
        for key in jwks["keys"]:
            if key["kid"] == unverified_header["kid"]:
                rsa_key = {
                    "kty": key["kty"],
                    "kid": key["kid"],
                    "use": key["use"],
                    "n": key["n"],
                    "e": key["e"]
                }

        if rsa_key:
            payload = jwt.decode(
                token,
                rsa_key,
                options={'verify_at_hash': False},
                algorithms=unverified_header["alg"],
                audience=config.Auth0.ClientID,
                issuer="https://" + config.Auth0.Domain + "/"
            )
            return payload
        elif not rsa_key and not jwks_refreshed:
            return validate_token(token, True)
        else:
            return handle_error({"code": "invalid_header",
                                 "description": "Unable to find appropriate key"}, 400)

    except jwt.ExpiredSignatureError as e:
        return handle_error({"code": "token_expired",
                             "description": "token is expired"}, 401)
    except jwt.JWTClaimsError as e:
        logging.error("Auth error. %s" % e.message)
        return handle_error({"code": "invalid_claims",
                             "description": "incorrect claims, "
                                            "please check the audience and issuer"}, 401)
    except jwt.JWTError as e:
        handle_error({"code": "invalid_header", "description": "Authorization header "
                                                               "must be Bearer token"}, 401)
    except Exception:
        return handle_error({"code": "invalid_header",
                             "description": "Unable to parse authentication "
                                            "token."}, 400)
