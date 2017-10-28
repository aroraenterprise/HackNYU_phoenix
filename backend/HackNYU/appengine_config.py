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

import os
import sys

from google.appengine.ext import vendor

on_appengine = os.environ.get('SERVER_SOFTWARE','').startswith('Development')
if on_appengine and os.name == 'nt':
    os.name = None
    sys.platform = ''

vendor.add(os.path.join(os.path.dirname(os.path.realpath(__file__)), 'pylibs'))