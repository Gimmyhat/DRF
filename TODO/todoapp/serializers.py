from rest_framework.serializers import HyperlinkedModelSerializer
from .models import Project
from .models import ToDo


class ProjectSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Project
        fields = ['id', 'name', 'users', 'repository']


class ToDoSerializer(HyperlinkedModelSerializer):
    project = ProjectSerializer

    class Meta:
        model = ToDo
        fields = '__all__'
