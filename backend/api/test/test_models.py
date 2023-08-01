from django.test import TestCase
from ..models import User

class UserTest(TestCase):
    """
    Test module for User model
    """

    def setUp(self):
        """
        Set up infos for test User model
        """ 
        User.objects.create_user(
            email='testeuser1@email.com', password='testeuser1')
        
        User.objects.create_user(
            email='testeuser2@email.com', password='testeuser2')
    
    def test_user(self):
        test_user = User.objects.get(email="testeuser1@email.com")
        test_user_2 = User.objects.get(email="testeuser2@email.com")
        
        self.assertEqual(test_user.get_infos(), 'testeuser1@email.com has account!')
        self.assertEqual(test_user_2.get_infos(), 'testeuser2@email.com has account!')