from cryptography.fernet import Fernet
import base64


class CryptoService:
    def __init__(self, key=None):
        self.key = key or Fernet.generate_key()
        self.cipher = Fernet(self.key)
    
    def encrypt(self, message):
        encrypted = self.cipher.encrypt(message.encode())
        return base64.urlsafe_b64encode(encrypted).decode('utf-8')
    
    def decrypt(self, token):
        token_bytes = base64.urlsafe_b64decode(token.encode('utf-8'))
        return self.cipher.decrypt(token_bytes).decode()