from rest_framework import serializers
from .models import Task, Category, Status
from django.contrib.auth.models import User

class TaskSerializer(serializers.ModelSerializer):
    status = serializers.PrimaryKeyRelatedField(queryset=Status.objects.all())
    class Meta:
        model = Task
        fields = ['id', 'title', 'description', 'status', 'user', 'category', 'created_at', 'updated_at']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

class StatusSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField()
