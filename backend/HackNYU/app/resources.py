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
from app import app_ns
from flask_restplus import Resource


@app_ns.route('/schema')
class SchemaResource(Resource):
    def get(self):
        """
        Get Schema
        Outputs the swagger json for the entire api
        :return:
        """
        return self.api.__schema__