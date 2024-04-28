from email.message import Message
import uuid
from hashlib import sha256
from app.models.user import User


class Chat:
  def __init__(self, name, password, creator):
    self.id = uuid.uuid4()
    self.name = name
    self.password = self._hash_password(password)
    self.creator = creator
    self.messages = []
    self.members = [creator]  # Le créateur est le premier membre de la liste

  def _hash_password(self, password):
    return sha256(password.encode('utf-8')).hexdigest()

  def to_dict(self):
    return {
      'id': str(self.id),
      'name': self.name,
      'password': self.password,
      'creator': self.creator, 
      'messages': [message.to_dict() for message in self.messages],
      'members': self.members,
    }

  def add_message(self, message):
    if isinstance(message, Message):
      self.messages.append(message)  # Ajoute un message à la liste

  def add_member(self, user):
      if isinstance(user, User) and user not in self.members:
          self.members.append(user)  # Ajoute un utilisateur à la liste des membres



