from django.urls import reverse

from rest_framework.test import APITestCase

class TestSetUp(APITestCase):
    """
    Set up urls to test
    """
    def setUp(self):

        self.signup_url = reverse('signup')
        self.login_url = reverse('login')
        self.logout_url = reverse('logout')
        
        self.user_data = {
            'email': 'emailuser1@gmail.com',
            'password': 'newuser1'
        } 
        self.user_data_upt = {
            'email': 'emailuser2@gmail.com',
            'password': 'newuser2'
        } 
        
        return super().setUp()
    
    def tearDown(self):
        return super().tearDown()
