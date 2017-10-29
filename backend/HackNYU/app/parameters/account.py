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
from app.parameters.media import media_id_param
from flask_restplus import fields

account_param = app_ns.model('AccountParam', {
    'name': fields.String(required=True),
    'email': fields.String(),
    'nickname': fields.String(),
    'picture': fields.Nested(media_id_param)
})