from flask_restplus import Namespace

project_ns = Namespace('Projects', path='/projects', description='Manage projects')

import resources