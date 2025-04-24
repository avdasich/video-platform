from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from django.shortcuts import get_object_or_404
from .models import Video
from .serializers import VideoSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics, permissions
from rest_framework.generics import UpdateAPIView, DestroyAPIView
from .permissions import IsOwner
from rest_framework.parsers import MultiPartParser, JSONParser

# Список всех видео
class VideoListView(generics.ListAPIView):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer
    permission_classes = [permissions.AllowAny]

# Загрузка видео
class VideoUploadView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = VideoSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

# Получение одного видео
class VideoRetrieveAPIView(generics.RetrieveAPIView):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer
    permission_classes = [permissions.AllowAny]

    def get_object(self):
        return get_object_or_404(Video, pk=self.kwargs['pk'])

# Обновление видео
class VideoUpdateAPIView(UpdateAPIView):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer
    permission_classes = [IsOwner]
    parser_classes = [MultiPartParser, JSONParser]

    def perform_update(self, serializer):
        # Убираем добавление user, так как он не должен меняться
        serializer.save()

# Удаление видео
class VideoDeleteAPIView(DestroyAPIView):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer
    permission_classes = [IsOwner]

    def perform_destroy(self, instance):
        if instance.file:
            instance.file.delete()
        super().perform_destroy(instance)