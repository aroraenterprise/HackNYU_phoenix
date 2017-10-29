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

from extensions.model import Model


class AccountModel(Model):
    name = ndb.StringProperty()
    email = ndb.StringProperty()
    nickname = ndb.StringProperty()
    picture_key = ndb.KeyProperty(kind='MediaModel')
    show_setup = ndb.ComputedProperty(lambda x: x.name is None)

    def __init__(self, *args, **kwds):
        super(AccountModel, self).__init__(*args, **kwds)
        self._cached_picture = None

    @property
    def picture(self):
        if self.picture_key and not self._cached_picture:
            self._cached_picture = self.picture_key.get()
        return self._cached_picture
