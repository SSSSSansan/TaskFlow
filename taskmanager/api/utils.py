import jwt
from jwt.exceptions import ExpiredSignatureError, InvalidTokenError

# Ваш секретный ключ, его можно найти в настройках Django
SECRET_KEY = 'django-insecure-)v7+=7j$zbn&d_yyp0osao09gv-7i7z$34jz-4!ew&%8x9%a$p'

def validate_token(token):
    try:
        # Декодируем токен, проверяя подпись
        decoded_token = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        print("Token is valid:", decoded_token)
        return decoded_token
    except ExpiredSignatureError:
        print("Token has expired.")
        return None
    except InvalidTokenError:
        print("Invalid token.")
        return None
