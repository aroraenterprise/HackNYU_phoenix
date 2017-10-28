#!/usr/bin/env python
"""
/* Copyright (C) AroraEnterprise Systems, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Sajal Arora <saj.arora24@gmail.com>, June, 2017
 */
 
Project: BlueHop
Author: sajarora
Date: 2017-06-27
Description:
"""
import pytz
from dateutil import parser
from six import iteritems

from flask_restplus import Model, fields


class CursorField(fields.String):
    def format(self, value):
        return value.urlsafe() if value else None


class UTCDateTimeField(fields.DateTime):
    def format(self, value):
        return super(UTCDateTimeField, self).format(pytz.utc.localize(value))


class UTCDateTimeFieldIn(fields.DateTime):
    def format(self, value):
        value = super(UTCDateTimeFieldIn, self).format(value)
        value = parser.parse(value).astimezone(pytz.utc).replace(tzinfo=None)
        return value

MetaModel = Model('Meta', {
    'next': fields.String,
    'prev': fields.String,
    'more': fields.Boolean,
    'page_size': fields.Integer,
    'total': fields.Integer
})

def make_pagination_schema(namespace, name, *items):
    """
    Add meta fields to a pagination schema
    :param items:
    :return:
    """
    namespace.add_model('Meta', MetaModel)
    result = {
        'meta': fields.Nested(MetaModel)
    }
    for item in items:
        for k, v in iteritems(item):
            result[k] = v

    return namespace.model(name, result)
