from rest_framework import serializers
from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model, authenticate

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    """
    Serializer user's information.
    """
    class Meta:
        model = User
        fields = ['id', 'email', 'password']

class SignUpSerializer(serializers.ModelSerializer):
    """
    Serializer for register an user.
    """
    class Meta:
        model = User
        fields = '__all__'

    def create(self, validated_data):
        """
        Create and return a new `User` instance.
        """

        user = User.objects.create_user(email=validated_data['email'], password=validated_data['password'])
        user.save()

        return user


class LoginSerializer(serializers.Serializer):
    """
    Serializer for login an user.
    """
    email = serializers.EmailField()
    password = serializers.CharField()

    def check(self, validated_data):
        """
        Checks for the existence of a user and returns it.
        """
        user = authenticate(username=validated_data['email'], password=validated_data['password'])
     
        if not user:
            raise ValidationError('user not found')
        return user



class UserChangeSerializer(serializers.Serializer):
    """
    Serializer for change information of an user.
    """
    email = serializers.EmailField()
    password = serializers.CharField()