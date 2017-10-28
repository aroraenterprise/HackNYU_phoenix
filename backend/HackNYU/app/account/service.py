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
from app.parameters.account import account_param
from extensions.decorators import parse_params


@parse_params(account_param)
def account_update(
        account,
        name,
        nickname=None,
        email=None,
        picture=None):
    nickname = nickname or name
    account.populate(**{
        'name': name,
        'nickname': nickname,
        'email': email,
        'picture': picture
    })
    account.put()
    return account