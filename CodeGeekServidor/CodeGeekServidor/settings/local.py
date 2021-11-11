from .base import *
# Database
# https://docs.djangoproject.com/en/3.2/ref/settings/#databases
DEBUG =True

ALLOWED_HOSTS=[    
    "18.204.209.131",
    "www.codegeeks.tk",]

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.oracle',
        'NAME': 'geek',
        'USER': 'code',
        'PASSWORD': 'admin',
        'HOST': 'geek3.czoy1vdwgmhj.us-east-1.rds.amazonaws.com',
        'PORT': '1521',
    }
}
# sqlplus /nolog
# CONNECT test3/admin@//geek3.czoy1vdwgmhj.us-east-1.rds.amazonaws.com:1521/geek

# Password validation
# https://docs.djangoproject.com/en/3.2/ref/settings/#auth-password-validators

STATIC_URL = '/static/'
CORS_ALLOWED_ALL_ORIGINS=True
STATICFILS_DIRS = [os.path.join(BASE_DIR, '../templates/build/static')]



