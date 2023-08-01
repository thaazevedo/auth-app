from django.urls import reverse
from rest_framework import status
from .test_setup import TestSetUp

class TestViews(TestSetUp):
    """
    Test views of User
    """

    def test_signup_user(self):
        """
        Test SignUp View.
        """
        # Signup an user
        res = self.client.post(self.signup_url, self.user_data, format="json")
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
    
    def test_login_user(self):
        """
        Test Login View.
        """
        # Need sign an user for test login
        self.test_signup_user()

        # Login an user
        res = self.client.post(self.login_url, self.user_data, format="json")
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_logout_user(self):
        """
        Test Logout View.
        """
        # Need sign an user for test logout
        self.test_signup_user()

        # Logout an user
        res = self.client.post(self.login_url, self.user_data, format="json")
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def prepare_to_user_detail(self):
        """
        Return id_user for user_detail views (get, update and delete).
        """
        
        self.client.post(self.signup_url, self.user_data, format="json")
        res = self.client.post(self.login_url, self.user_data, format="json")
        id_user = res.data['id']

        return id_user
    
    def test_user_detail_get(self):
        """
        Test User get infos view.
        """
        # Need id_user/login for get infos
        id_user = self.prepare_to_user_detail()

        # Get infos of an user
        res = self.client.get(reverse('user', kwargs={'id': id_user}))
        self.assertEqual(res.status_code, status.HTTP_200_OK)      

    def test_user_getail_put(self):
        """
        Test user update infos view.
        """
        # Need id_user/login for get infos
        id_user = self.prepare_to_user_detail()

        # Update an user
        res = self.client.put(reverse('user', kwargs={'id': id_user}), self.user_data_upt, format="json")
        self.assertEqual(res.status_code, status.HTTP_200_OK) 

        # Try get infos of new user
        res_new_user = self.client.get(reverse('user', kwargs={'id': id_user}))
        self.assertEqual(res_new_user.data['email'], 'emailuser2@gmail.com')
    
    def test_user_delete(self):
        """
        Test user delet view.
        """
        id_user = self.prepare_to_user_detail()

        # Delete user
        res = self.client.delete(reverse('user', kwargs={'id': id_user}))
        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)

        # Try get an deleted user
        res_get_delete_user = self.client.get(reverse('user', kwargs={'id': id_user}))
        self.assertEqual(res_get_delete_user.status_code, status.HTTP_404_NOT_FOUND)
        
