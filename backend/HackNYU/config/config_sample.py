
class ConfigDev(object):
    """
    Config object that holds basic configuration settings for the application
    """
    app_name = 'HackNYU'
    app_base_url = '/api'
    description = 'HackNYU is a collaborative platform to build ideas into reality'
    versionCode = 1
    production = True
    support_email = 'email@example.com'

    class Auth0:
        Domain = 'auth0_domain'
        ClientID = 'auth0_client_id'

