from rest_framework import serializers
from .models import Task, Category, Status
from django.contrib.auth.models import User

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'

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
