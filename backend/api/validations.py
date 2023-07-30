from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model

User = get_user_model()

def custom_validation(data):
    """
    Validation items for register an user and return it.
    """
    email = data['email'].strip()
    password = data['password'].strip()
    
    if not email or User.objects.filter(email=email).exists():
        raise ValidationError('choose another email')
    
    if not password or len(password) < 8:
        raise ValidationError('choose another password, min 8 characters')
    
    return data


def validate_email(data):
    """
    Validate email.
    """

    email = data['email'].strip()

    if not email:
        raise ValidationError('an email is needed')
    return True

def validate_password(data):
    """
    Validate password.
    """
    
    password = data['password'].strip()
    if not password:
        raise ValidationError('a password is needed')
    return True