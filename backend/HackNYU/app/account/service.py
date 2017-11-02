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
from google.appengine.ext import ndb

from app.parameters.account import account_param
from extensions.decorators import parse_params


@parse_params(account_param)
def update(
        account,
        name,
        nickname=None,
        email=None,
        picture=None):
    nickname = nickname or name

    # parse picture key if one is present
    picture_key = None
    if picture and picture.get('id'):
        picture_key = ndb.Key('MediaModel', picture.get('id'))

    account.populate(**{
        'name': name,
        'nickname': nickname,
        'email': email,
        'picture_key': picture_key
    })
    account.put()
    return account