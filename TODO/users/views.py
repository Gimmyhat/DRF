from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, UpdateModelMixin, CreateModelMixin
from rest_framework.viewsets import GenericViewSet, ModelViewSet

from .models import CustomUser
from .serializers import UserModelSerializer, UserModelSerializerNew


class UserModelViewSet(ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UserModelSerializer

    def get_serializer_class(self):
        if self.request.version == '0.2':
            return UserModelSerializerNew
        return UserModelSerializer
