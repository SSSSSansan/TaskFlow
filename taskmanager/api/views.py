from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import generics, status
from .models import Task, Category, Status
from .serializers import TaskSerializer, CategorySerializer, UserLoginSerializer, StatusSerializer
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from django.http import JsonResponse
from .utils import validate_token

def validate_token(token):
    try:
        decoded_token = jwt.decode(token, 'your_secret_key', algorithms=["HS256"])
        print("Token is valid:", decoded_token)
        return decoded_token
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None
    
@api_view(['POST'])
def my_view(request):
    token = request.headers.get('Authorization').split(' ')[1]  # Получаем токен из заголовка
    decoded_token = validate_token(token)

    if decoded_token:
        # Если токен валиден, продолжите выполнение логики
        return JsonResponse({'message': 'Token is valid!'}, status=200)
    else:
        # Если токен не валиден, возвращаем ошибку
        return JsonResponse({'error': 'Unauthorized'}, status=401)


@api_view(['POST'])
@permission_classes([AllowAny])
@authentication_classes([])
def login_view(request):
    serializer = UserLoginSerializer(data=request.data)

    if serializer.is_valid():
        username = serializer.validated_data['username']
        password = serializer.validated_data['password']
        print("Received:", username, password)  # 🔍 Проверка

        user = authenticate(username=username, password=password)

        if user:
            refresh = RefreshToken.for_user(user)
            return Response({
                'access': str(refresh.access_token),
                'refresh': str(refresh)
            }, status=status.HTTP_200_OK)
        else:
            print("❌ Invalid credentials for:", username)
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

    else:
        print("❌ Invalid data format:", serializer.errors)
        return Response({'error': 'Invalid data'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_view(request):
    try:
        token = RefreshToken(request.data['refresh'])
        token.blacklist()
        return Response(status=205)
    except Exception:
        return Response(status=400)

class TaskListCreate(generics.ListCreateAPIView):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        status = self.request.query_params.get('status', None)  # Получаем статус из параметров запроса
        queryset = Task.objects.filter(user=self.request.user)

        if status:
            queryset = queryset.filter(status=status)  # Фильтруем по статусу

        return queryset
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class TaskDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Task.objects.filter(user=self.request.user)

class CategoryList(APIView):
    def get(self, request):
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)

class StatusList(APIView):
    def get(self, request):
        statuses = Status.objects.all()
        serializer = StatusSerializer(statuses, many=True)
        return Response(serializer.data)
