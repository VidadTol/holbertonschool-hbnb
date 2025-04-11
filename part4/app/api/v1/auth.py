from flask_restx import Namespace, Resource, fields, api
from flask_jwt_extended import create_access_token
from app.services.facade import HBnBFacade
from flask_jwt_extended import jwt_required, get_jwt_identity

api = Namespace('auth', description='Authentication operations')

facade = HBnBFacade()

login_model = api.model('Login', {
    'email': fields.String(required=True, description='User email'),
    'password': fields.String(required=True, description='User password')
})

@api.route('/login')
class Login(Resource):
    @api.expect(login_model)
    def post(self):
        """Authenticate user and return a JWT token"""
        credentials = api.payload
        user = facade.get_user_by_email(credentials['email'])
        if not user or not user.verify_password(credentials['password']):
            return {'error': 'Invalid credentials'}, 401
        access_token = create_access_token(identity={'id': str(user.id), 'is_admin': user.is_admin})
        print(f"Generated JWT token for user {user.id}: {access_token}")
        return {'access_token': access_token}, 200

@api.route('/protected')
class ProtectedResource(Resource):
    @jwt_required()
    def get(self):
        """A protected endpoint that requires a valid JWT token"""
        current_user = get_jwt_identity()
        return {'message': f'Hello, user {current_user["id"]}'}, 200