from django.contrib.auth import login, logout

from rest_framework import permissions, status
from rest_framework.authentication import SessionAuthentication
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import User
from .serializers import UserSerializer, LoginSerializer, SignUpSerializer, UserChangeSerializer
from .validations import custom_validation, validate_email, validate_password


class SignUp(APIView):
    """
    API endpoint that register an user.
    """

    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        """
        Create an user and returns it.
        """

        validated_data = custom_validation(request.data)
        serializer = SignUpSerializer(data=validated_data)

        if serializer.is_valid(raise_exception=True):
            user = serializer.create(validated_data)
            print(user.id)
                        
            if user:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(status=status.HTTP_400_BAD_REQUEST)


class Login(APIView):
    """
    API endpoint that login an user.
    """

    permission_classes = (permissions.AllowAny,)
    authentication_classes = (SessionAuthentication,)
    
    def post(self, request):
        """
        Checks for the existence of a user and login.
        """
        data = request.data

        assert validate_email(data)
        assert validate_password(data)

        serializer = LoginSerializer(data=data)

        if serializer.is_valid(raise_exception=True):
            user = serializer.check(data)
            login(request, user)

            return Response(serializer.data, status=status.HTTP_200_OK)


class Logout(APIView):
    """
    API endpoint that logout an user.
    """
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    def post(self, request):
        logout(request)
        return Response(status=status.HTTP_200_OK)



@api_view(['GET', 'PUT', 'DELETE'])
def user_detail(request, id):
    """
    Retrieve, update or delete an user.

    *Visible for logged-in users 
    """
    uuid = id
    print(id, uuid)
    try:
        user = User.objects.get(id=uuid)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        """
        Return infos of an user.
        """
        
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    elif request.method == 'PUT':
        """
        Update onfos of an user.
        """
        print('PUT')
        serializer = UserChangeSerializer(data=request.data)
        print(serializer)
        if serializer.is_valid():
            print("is valid")
            password = user.password 
            new_password = serializer.data['password']

            new_email = serializer.data['email']
            print(f"old: {password}, new: {new_password}")
            is_same_as_old = user.check_password(new_password)
            
            if is_same_as_old:
                return Response({"password": ["It should be different from your last password."]},
                                status=status.HTTP_400_BAD_REQUEST)
            
            user.email = new_email
            user.set_password(new_password)
            user.save()
            
            print("new user")
            print(user.email)
            print(user.password)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        print("serializer not valid")
        return Response(serializer.data, status=status.HTTP_404_NOT_FOUND)

    elif request.method == 'DELETE':
        """
        Delete an user
        """
        print("delete")
        user.delete()
        print(user)
        return Response(status=status.HTTP_204_NO_CONTENT)