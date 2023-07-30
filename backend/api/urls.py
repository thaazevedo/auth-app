from django.urls import path
from .views import SignUp, Login, Logout, user_detail

urlpatterns = [
	path('signup/', SignUp.as_view(), name='register'),
	path('login/', Login.as_view(), name='login'),
	path('logout/', Logout.as_view(), name='logout'),
	path('user/<uuid:id>', user_detail, name='user'),
]