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
from app.account import account_ns
from app.account.decorators import login_required
import service as account_service
from app.parameters.account import account_param
from app.schemas.account import account_schema
from flask_restplus import Resource


@account_ns.route('/authenticate')
class AccountAuthenticate(Resource):
    @account_ns.doc('authenticate', id="authenticate")
    @login_required
    @account_ns.marshal_with(account_schema)
    def get(self, account):
        return account


@account_ns.route('')
class Account(Resource):
    @account_ns.doc('update', id="update")
    @login_required
    @account_ns.expect(account_param)
    @account_ns.marshal_with(account_schema)
    def put(self, account):
        return account_service.update(account)


    @account_ns.doc('delete', id="delete")
    @login_required
    @account_ns.marshal_with({}, code=204)
    def delete(self, account):
        # return account_delete(account)
        return 204, ''
