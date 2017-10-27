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

from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
# turn off masking
app.config['RESTPLUS_MASK_SWAGGER'] = False
app.config['ERROR_404_HELP'] = False

from app import blueprint

app.register_blueprint(blueprint)

CORS(app)