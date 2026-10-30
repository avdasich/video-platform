from django.urls import path, include
from .views import VideoUploadView, VideoUpdateAPIView, VideoDeleteAPIView, VideoRetrieveAPIView, VideoListView
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework import permissions


schema_view = get_schema_view(
    openapi.Info(
        title="Video Platform API - Videos",
        default_version='v1',
        description="Video related API endpoints",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="contact@videoplatform.local"),
        license=openapi.License(name="MIT"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [

    path('', VideoListView.as_view(), name='video-list'),

    path('upload/', VideoUploadView.as_view(), name='video-upload'),

    path('<int:pk>/', VideoRetrieveAPIView.as_view(), name='video-detail'),
    path('<int:pk>/edit/', VideoUpdateAPIView.as_view(), name='video-edit'),
    path('<int:pk>/delete/', VideoDeleteAPIView.as_view(), name='video-delete'),

    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
]