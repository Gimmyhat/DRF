from django import db
from django.test import TestCase

from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase
from mixer.backend.django import mixer
from django.contrib.auth.models import User

from .views import UserModelViewSet
from .models import CustomUser


class TestUserViewSet(TestCase):

    def setUp(self) -> None:
        self.url = '/api/users/'
        self.users_dict = {"username": "User_test",
                           "first_name": "User",
                           "last_name": "TestOne",
                           "email": "usertest1@mail.ru"}
        self.users_dict_fake = {"username": "User_test2",
                                "first_name": "User",
                                "last_name": "TestTwo",
                                "email": "usertest2@mail.ru"}
        self.format = 'json'
        self.login = 'admin'
        self.password = 'admin12345'
        self.admin = User.objects.create_superuser(self.login, 'ad@em.ru', self.password)
        self.users = CustomUser.objects.create(**self.users_dict)

    def test_factory_get_list_without_auth(self):
        factory = APIRequestFactory()
        request = factory.get(self.url)
        view = UserModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_api_client_get_list_with_auth(self):
        client = APIClient()
        client.login(username=self.login, password=self.password)
        response = client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_api_client_detail(self):
        # APIClient
        client = APIClient()
        client.login(username=self.login, password=self.password)
        response = client.get(f'{self.url}{self.users.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_api_client_update_guest(self):
        client = APIClient()
        response = client.put(f'{self.url}{self.users.id}/', **self.users_dict_fake)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_api_client_update_admin(self):
        client = APIClient()
        client.force_authenticate(user=self.admin)
        response = client.put(f'{self.url}{self.users.id}/',
                              self.users_dict_fake, format=self.format)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.users.refresh_from_db()
        self.assertEqual(self.users.username, self.users_dict_fake.get('username'))
        self.assertEqual(self.users.first_name, self.users_dict_fake.get('first_name'))
        self.assertEqual(self.users.last_name, self.users_dict_fake.get('last_name'))
        client.logout()

    def tearDown(self) -> None:
        pass


class TestMath(APISimpleTestCase):

    def test_sqrt(self):
        import math
        response = math.sqrt(4)
        self.assertEqual(response, 2)
