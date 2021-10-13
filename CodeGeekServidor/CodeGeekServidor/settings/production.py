from .base import *

# Database
# https://docs.djangoproject.com/en/3.2/ref/settings/#databases

DEBUG =True

ALLOWED_HOSTS=[]

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}


# Password validation
# https://docs.djangoproject.com/en/3.2/ref/settings/#auth-password-validators
STATIC_URL = '/static/'
CORS_ALLOWED_ALL_ORIGINS=True
STATICFILS_DIRS = [os.path.join(BASE_DIR, '../templates/build/static')]




