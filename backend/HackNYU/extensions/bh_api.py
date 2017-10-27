#!/usr/bin/env python
"""
/* Copyright (C) AroraEnterprise Systems, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Sajal Arora <saj.arora24@gmail.com>, June, 2017
 */
 
Project: BlueHop
Author: sajarora
Date: 2017-07-07
Description:
"""
from extensions.bh_swagger import BhSwagger
from werkzeug.utils import cached_property

from flask_restplus import Api


class BhApi(Api):
    @cached_property
    def __schema__(self):
        '''
        The Swagger specifications/schema for this API

        :returns dict: the schema as a serializable dict
        '''
        if not self._schema:
            self._schema = BhSwagger(self).as_dict()
        return self._schema