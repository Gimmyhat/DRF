from django_filters import rest_framework as filters
from .models import ToDo, Project


class ProjectFilter(filters.FilterSet):
    name = filters.CharFilter(lookup_expr='contains')

    class Meta:
        model = Project
        fields = ['name']


class ToDoFilter(filters.FilterSet):

    class Meta:
        model = ToDo
        fields = ['project']
