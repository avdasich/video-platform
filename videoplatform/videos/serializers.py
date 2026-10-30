from rest_framework import serializers
from .models import Video, Comment, Rating

class VideoSerializer(serializers.ModelSerializer):
    file_url = serializers.SerializerMethodField()
    is_owner = serializers.SerializerMethodField()
    
    class Meta:
        model = Video
        fields = ['id', 'title', 'description', 'file', 'file_url', 'created_at', 'is_owner']
        extra_kwargs = {
            'file': {'required': False}
        }
    
    def get_file_url(self, obj):
        request = self.context.get('request')
        if obj.file:
            return request.build_absolute_uri(obj.file.url)
        return None
    
    def get_is_owner(self, obj):
        request = self.context.get('request')
        return request and request.user == obj.user

    def update(self, instance, validated_data):
        previous_file = instance.file if 'file' in validated_data else None
        instance = super().update(instance, validated_data)
        if previous_file and previous_file.name != instance.file.name:
            previous_file.delete(save=False)
        return instance

    def validate(self, data):
        if self.instance is None and not data.get('file'):
            raise serializers.ValidationError({'file': 'Выбери видеофайл.'})
        return data

class CommentSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)
    
    class Meta:
        model = Comment
        fields = ['id', 'video', 'user', 'text', 'created_at']
        read_only_fields = ['user', 'created_at']

class RatingSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)
    
    class Meta:
        model = Rating
        fields = ['id', 'video', 'user', 'rating', 'created_at']
        read_only_fields = ['user', 'created_at']
        
    def validate(self, data):
        if self.instance and self.instance.user != self.context['request'].user:
            raise serializers.ValidationError("Вы не можете изменять это видео")
        return data