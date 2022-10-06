from rest_framework import status
from rest_framework.generics import get_object_or_404
from rest_framework import mixins
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from .serializers import ProjectSerializer, ToDoSerializer
from .models import Project, ToDo
from .filters import ToDoFilter, ProjectFilter


class ProjectLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10


class ToDoLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 20


class ProjectViewSet(ModelViewSet):
    serializer_class = ProjectSerializer
    queryset = Project.objects.all()
    # pagination_class = ProjectLimitOffsetPagination
    # filter_class = ProjectFilter


class ToDoViewSet(ModelViewSet):
    serializer_class = ToDoSerializer
    queryset = ToDo.objects.all()
    # pagination_class = ToDoLimitOffsetPagination
    # filter_class = ToDoFilter

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.active_toggle(instance)
        serializer = self.get_serializer(instance, data=self.get_serializer(instance).data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def active_toggle(self, instance):
        instance.is_active = False
