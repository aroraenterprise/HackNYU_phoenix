
import os

config = None
if os.environ.get('SERVER_SOFTWARE', '').startswith('Google App Eng'):  # production mode
    from config_prod import ConfigProd as config
else:
    from config_dev import ConfigDev as config