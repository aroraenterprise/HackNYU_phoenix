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

from flask import request
from flask_restplus import abort, marshal, marshal_with
from flask_restplus.reqparse import RequestParser
from functools32 import wraps


def get_model_by_id(Model, modelName, idStub=None):
    def decorator(f):
        @wraps(f)
        def wrapped_func(*args, **kwargs):
            if not (idStub or 'id') in kwargs:
                abort(400, 'Missing %s id.' % modelName)
            id = kwargs.pop(idStub or 'id')
            model = Model.get_by_id(id)
            if not model or not model.valid:
                abort(404, message='%s not found.' % modelName)
            kwargs.update({
                modelName: model
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
            # try:
            return f(*args, **data)
            # except TypeError as e:
            #     logging.error(e.message)
            #     if isinstance(params, RequestParser):
            #         result = "Invalid arguments."
            #     else:
            #         result = ', '.join(['%s: %s' % (key, str(value.__schema_type__)) for key, value in params.iteritems()])
            #     abort(400, "Invalid parameters. Allowed Params `%s`" % result)
        return wrapped_func
    return decorator