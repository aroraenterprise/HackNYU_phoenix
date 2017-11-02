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
from config import config
from extensions.bh_api import BhApi
from flask import Blueprint
from flask_restplus import Namespace

blueprint = Blueprint(
    config.app_base_url,
    __name__,
    url_prefix='' if not config.app_base_url else config.app_base_url
)

authorizations = {
    'apikey': {
        'type': 'apiKey',
        'in': 'header',
        'name': 'X-API-KEY'
    }
}

api = BhApi(blueprint,
            title=config.app_name,
            description=config.description,
            version=config.versionCode,
            support=config.support_email,
            validate=True,
            default_mediatype='application/json',
            authorizations=authorizations,
            security='apikey')

app_ns = Namespace('App', path='/app', description='App details')
import resources

from account import account_ns
from media import media_ns
from project import project_ns

api.add_namespace(app_ns)
api.add_namespace(account_ns)
api.add_namespace(media_ns)
api.add_namespace(project_ns)