#!/usr/bin/env python
"""
/*
 * You can modify, copy and change any and all of the code
 * Just keep the header AS IS. You can add to it
 * Written by Saj Arora <saj.arora24@gmail.com>
 */
 
Project: HackNYU
Author: sajarora
Date: 2017-10-27
Description:
"""
from google.appengine.ext import ndb

from app.parameters.project import project_param
from app.project.project_model import ProjectModel
from app.values.error_tokens import ErrorToken
from extensions.bh_api import bh_abort
from extensions.decorators import parse_params


@parse_params(project_param)
def create(account, name, short, **kwargs):
    project = ProjectModel(
        creator_key=account.key,
        name=name,
        short=short
    )
    return process(project, name, short, **kwargs)


@parse_params(project_param)
def update(account, project, **kwargs):
    #check permissions here to edit project
    if project.creator_key != account.key:
        bh_abort(403, ErrorToken.NotAllowed)
    return process(project, **kwargs)


def process(
        project,
        name,
        short,
        long=None,
        website=None,
        tech_stack=None,
        featured_video=None,
        videos=None,
        files=None,
        images=None,
        featured_image=None,
        logo=None):

    short = (short[:ProjectModel.ShortMaxLength - 2] + '..') if len (short) > ProjectModel.ShortMaxLength else short

    # parse media keys if one is present
    file_keys = []
    if files:
        for file in files:
            file_keys.append(ndb.Key('MediaModel', file.get('id')))

    image_keys = []
    if images:
        for image in images:
            image_keys.append(ndb.Key('MediaModel', image.get('id')))

    featured_image_key = None
    if featured_image:
        featured_image_key = ndb.Key('MediaModel', featured_image.get('id'))

    logo_key = None
    if logo:
        logo_key = ndb.Key('MediaModel', logo.get('id'))

    project.populate(**{
        'name': name,
        'short': short,
        'long': long,
        'website': website,
        'tech_stack': tech_stack,
        'featured_video': featured_video,
        'videos': videos,
        'file_keys': file_keys,
        'image_keys': image_keys,
        'feature_image_key': featured_image_key,
        'logo_key': logo_key
    })
    project.put()
    return project
