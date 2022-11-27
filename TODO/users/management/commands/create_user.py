from django.contrib.auth.models import User
from django.core.management import BaseCommand

from todoapp.models import Project, ToDo


class Command(BaseCommand):

    def handle(self, *args, **options):
        user = User.objects.filter(username='root').first()
        if not user:
            User.objects.create_superuser(username='root', password='1', email='admin@mail.ru')
