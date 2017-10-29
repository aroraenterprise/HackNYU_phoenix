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
from google.appengine.ext import ndb

from flask_restplus import abort
from model import Model


class CreatorModel(Model):
    creator_key = ndb.KeyProperty(required=True)

    def __init__(self, *args, **kwds):
        super(CreatorModel, self).__init__(*args, **kwds)
        self._cacheCreator = None

    @property
    def creator(self):
        if not self._cacheCreator:
            self._cacheCreator = self.creator_key.get()
        return self._cacheCreator

    def _pre_put_hook(self):
        if not self.creator_key:
            logging.error("Model does not have a creator: %s" % str(self.__dict__))
            abort(500, "Invalid model.")