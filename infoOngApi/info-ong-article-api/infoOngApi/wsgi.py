"""
WSGI config for infoOngApi project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.0/howto/deployment/wsgi/
"""

import os
import sys

#sys.path.append('/home/ong-dev/info-ong/info-ong-article-api)
project_home = os.path.dirname(os.getcwd())
if project_home not in sys.path:
    sys.path.append(project_home)

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'infoOngApi.settings')

application = get_wsgi_application()
