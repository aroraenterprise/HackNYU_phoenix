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
from flask_restplus import Swagger


class BhSwagger(Swagger):

    def parameters_for(self, doc):
        params = super(BhSwagger, self).parameters_for(doc)
        required_params = []
        optional_params = []
        for param in params:
            if 'required' in param.keys() and param.get('required'):
                required_params.append(param)
            else:
                optional_params.append(param)
        return sorted(required_params, key=lambda x: x.get('name')) + \
               sorted(optional_params, key=lambda x: x.get('name'))