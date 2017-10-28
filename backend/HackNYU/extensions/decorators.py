#!/usr/bin/env python
"""
/* Copyright (C) AroraEnterprise Systems, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Sajal Arora <saj.arora24@gmail.com>, June, 2017
 */
 
Project: BlueHop
Author: sajarora
Date: 2017-06-15
Description:
"""
import logging
import re

from google.appengine.ext import ndb

from extensions.bh_api import bh_abort
from flask import request
from flask_restplus import abort, marshal, marshal_with
from flask_restplus.reqparse import RequestParser
from functools32 import wraps

class ModelByIdError(object):
    def __init__(self, not_found_token, not_found_string=None):
        self.not_found_token = not_found_token
        self.not_found_string = not_found_string


def get_model_by_id(Model, return_token, model_by_id_error, id_stub=None, parent_key=None):
    """
    :param Model: 
    :param model_by_id_error: ModelByIdError
    :param id_stub: 
    :return: 
    """
    id_stub = id_stub or 'id'
    def decorator(f):
        @wraps(f)
        def wrapped_func(*args, **kwargs):
            if id_stub not in kwargs:
                raise Exception("The decorated resource does not have a key/value pair for `%s`" % id_stub)
            id = kwargs.pop(id_stub)
            parent = None
            if parent_key and parent_key in kwargs:
                parent = kwargs.get(parent_key)

            model = Model.get_by_id(id, parent=parent.key if parent else None)
            if not model or not model.valid:
                return bh_abort(404, model_by_id_error.not_found_token, model_by_id_error.not_found_string)
            kwargs.update({
                return_token: model
            })
            return f(*args, **kwargs)
        return wrapped_func
    return decorator



def get_model_by_key(Model, return_token, model_by_id_error, key_stub=None):
    """
    :param Model: 
    :param model_by_id_error: ModelByIdError
    :param key_stub: 
    :return: 
    """
    key_stub = key_stub or 'key'
    def decorator(f):
        @wraps(f)
        def wrapped_func(*args, **kwargs):
            if key_stub not in kwargs:
                raise Exception("The decorated resource does not have a key/value pair for `%s`" % key_stub)
            key = kwargs.pop(key_stub)

            model = ndb.Key(urlsafe=key).get()
            if not model or not isinstance(model, Model) or not model.valid:
                return bh_abort(404, model_by_id_error.not_found_token, model_by_id_error.not_found_string)
            kwargs.update({
                return_token: model
            })
            return f(*args, **kwargs)
        return wrapped_func
    return decorator


def parse_params(params):
    def decorator(f):
        @wraps(f)
        def wrapped_func(*args, **kwargs):
            if isinstance(params, RequestParser):
                data = params.parse_args()
            else:
                data = marshal(request.get_json(), params)
            data.update(**kwargs)
            kwargs = {}
            for k, v in data.iteritems():
                kwargs[re.sub('([a-z0-9])([A-Z])', r'\1_\2', k).lower()] = v
            # try:
            return f(*args, **kwargs)
            # except TypeError as e:
            #     logging.error(e.message)
            #     if isinstance(params, RequestParser):
            #         result = "Invalid arguments."
            #     else:
            #         result = ', '.join(['%s: %s' % (key, str(value.__schema_type__)) for key, value in params.iteritems()])
            #     abort(400, "Invalid parameters. Allowed Params `%s`" % result)
        return wrapped_func
    return decorator