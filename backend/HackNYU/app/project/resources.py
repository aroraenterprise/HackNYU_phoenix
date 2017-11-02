import service as project_service
from app.account.decorators import login_required
from app.parameters.project import project_param
from app.project import project_ns
from app.schemas.project import project_schema, project_list_schema
from flask_restplus import Resource


@project_ns.route('')
class Projects(Resource):
    @project_ns.doc('list', id="list")
    @login_required
    @project_ns.marshal_with(project_list_schema)
    def get(self, account):
        """
        Get project list
        :param account: 
        :return: 
        """
        return {}

    @project_ns.doc('create', id="create")
    @login_required
    @project_ns.expect(project_param)
    @project_ns.marshal_with(project_schema)
    def post(self, account):
        """
        Create a project
        :param account: 
        :return: 
        """
        return project_service.create(account)
