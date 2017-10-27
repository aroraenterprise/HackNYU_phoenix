#!/usr/bin/env python
"""
/* Copyright (C) AroraEnterprise Systems, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Sajal Arora <saj.arora24@gmail.com>, June, 2017
 */
 
Project: BlueHop
Author: sajarora
Date: 2017-06-27
Description:
"""
from flask_restplus import reqparse, inputs


pagination = reqparse.RequestParser()
pagination.add_argument('limit', required=False, type=inputs.natural, choices=[5, 10, 20, 30, 50, 100], default=20)
pagination.add_argument('cursor', required=False)
pagination.add_argument('reverse', type=inputs.boolean)