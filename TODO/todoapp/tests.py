from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient
from django.contrib.auth.models import User
from todoapp.views import ProjectViewSet


class TestProjectViewSet(TestCase):

    def setUp(self):
        self.url = '/api/project/'
        self.login = 'admin'
        self.password = 'admin12345'
        self.admin = User.objects.create_superuser(self.login, 'ad@em.ru', self.password)

    def test_get_list_without_auth(self):
        factory = APIRequestFactory()
        request = factory.get(self.url)
        view = ProjectViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_list_with_auth(self):
        factory = APIRequestFactory()
        request = factory.get(self.url)
        force_authenticate(request, self.admin)
        view = ProjectViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_api_client_get_list_with_auth(self):
        client = APIClient()
        client.login(username=self.login, password=self.password)
        response = client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
