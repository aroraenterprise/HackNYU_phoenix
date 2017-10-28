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
from google.appengine.ext import ndb

from app.account.account_model import AccountModel
from extensions.model import Model


class SubModel(Model):
    account_key = ndb.KeyProperty(required=True)

    def __init__(self, *args, **kwds):
        super(SubModel, self).__init__(*args, **kwds)
        self._cached_account = None

    @property
    def account(self):
        if not self._cached_account:
            self._cached_account = self.account_key.get()
        return self._cached_account

    @classmethod
    def create(cls, sub):
        model = cls.get_by_id(sub)
        if model:
            return False
        if not model:
            account = AccountModel()
            account.put()
            model = cls(id=sub, account_key=account.key)
            model._cached_account = account
            model.put()
            return model
