from django.contrib.auth.base_user import BaseUserManager

class UserManager(BaseUserManager):
    """
    Management to user creation.
    """
    def create_user(self, email, password=None):
        if not email:
            raise ValueError('An email is required.')
        if not password:
            raise ValueError('A password is required.')

        email = self.normalize_email(email)
        user = self.model(email=email)

        user.set_password(password)
        user.save()

        return user

