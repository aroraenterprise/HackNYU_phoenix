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
import datetime
from google.appengine.ext import ndb

from config import config
from decorators import parse_params
from parameters import pagination


class Model(ndb.Model):
    created = ndb.DateTimeProperty(auto_now_add=True)
    modified = ndb.DateTimeProperty(auto_now=True)
    deleted_when = ndb.DateTimeProperty(default=None)

    @property
    def id(self):
        return self.key.id() if self.key else None

    @property
    def keyUrlsafe(self):
        return self.key.urlsafe() if self.key else None

    def delete(self):
        self.isDeleted = True
        self.put()

    @property
    def valid(self):
        return not self.isDeleted

    @valid.setter
    def valid(self, value):
        self.isDeleted = value

    @property
    def isDeleted(self):
        return self.deleted_when is not None

    @isDeleted.setter
    def isDeleted(self, value):
        if value:
            self.deleted_when = datetime.datetime.now()
        else:
            self.deleted_when = None

    @classmethod
    @parse_params(pagination)
    def paginate(cls, ancestor=None, show_deleted=False, limit=None, filters=None, cursor=None, reverse=False, **kwargs):
        filters = filters or []
        if not isinstance(filters, list):
            filters = [filters]
        if not show_deleted:
            filters.append(ndb.FilterNode('deletedWhen', '=', None))

        query = cls.query(ancestor=ancestor, filters=ndb.AND(*filters))
        query_cursor = ndb.Cursor(urlsafe=cursor)

        if reverse:
            query = query.order(cls.modified)
            query_cursor.reversed()
        else:
            query = query.order(-cls.modified)

        items_future = query.fetch_page_async(limit or config.DEFAULT_PAGE_SIZE, start_cursor=query_cursor)
        total_count_future = query.count_async(keys_only=True)
        items, query_cursor, more = items_future.get_result()

        if reverse:
            items = list(reversed(items)) # flip it for pagination
            prev_cursor = query_cursor.reversed().urlsafe() if more else None
            next_cursor = cursor
        else:
            prev_cursor = cursor
            next_cursor = query_cursor.urlsafe() if more else None

        return dict(
            items=items,
            meta=dict(
                next=next_cursor,
                prev=prev_cursor,
                more=more,
                page_size=kwargs.get('limit', config.DEFAULT_PAGE_SIZE),
                total=total_count_future.get_result()
            )
        )