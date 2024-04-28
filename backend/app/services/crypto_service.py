import base64 
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad,unpad

#CBC with Fix IV
class CryptoService:
    data = 'I love Medium'
    key = 'AAAAAAAAAAAAAAAA' #16 char for AES128

    #FIX IV
    iv =  'BBBBBBBBBBBBBBBB'.encode('utf-8') #16 char for AES128

    def encrypt(self,data):
            data = pad(data.encode(),16)
            cipher = AES.new(self.key.encode('utf-8'),AES.MODE_CBC,self.iv)
            return base64.b64encode(cipher.encrypt(data)).decode('utf-8')

    def decrypt(self,enc_data):
        enc_data = base64.b64decode(enc_data)
        cipher = AES.new(self.key.encode('utf-8'), AES.MODE_CBC, self.iv)
        return unpad(cipher.decrypt(enc_data),16).decode('utf-8')