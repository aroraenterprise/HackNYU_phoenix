#!/usr/bin/env python
"""
/*
 * You can modify, copy and change any and all of the code
 * Just keep the header AS IS. You can add to it
 * Written by Saj Arora <saj.arora24@gmail.com>
 */
 
Project: HackNYU
Author: sajarora
Date: 2017-10-27
Description:
"""
from app import app_ns
from app.schemas.media import media_schema
from extensions.schemas import UTCDateTimeField
from flask_restplus import fields

account_schema = app_ns.model('Account', {
    'id': fields.Integer(),
    'name': fields.String(),
    'nickname': fields.String(),
    'picture': fields.Nested(media_schema),
    'email': fields.String(),
    'joined': UTCDateTimeField(attribute='created'),
    'showSetup': fields.Boolean(attribute='show_setup')
})