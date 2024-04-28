from email.message import Message
import uuid
from hashlib import sha256
from app.models.user import User


class Chat:
  def __init__(self, Id : str, Name : str, Password : str, Creator : User, Messages : list, Members : list):
    self.Id = Id if (Id != "") else str(uuid.uuid4())
    self.Name = Name
    self.Password = self._hash_password(Password)
    self.Creator = Creator
    self.Messages = Messages
    self.Members = Members

  def _hash_password(self, password):
    return sha256(password.encode('utf-8')).hexdigest()

  def to_dict(self):
    msg_dict = []
    usr_dict = []
    for msg in self.Messages:
      msg_dict.append(msg.to_dict())
    for usr in self.Members:
      usr_dict.append(usr.to_dict())
    return {
            'Id': self.Id,
            'Name': self.Name, 
            'Password': self.Password, 
            'Creator': self.Creator.to_dict(), 
            'Messages': msg_dict,
            'Members': usr_dict
    }

  def add_message(self, message):
    if isinstance(message, Message):
      self.Messages.append(message)  # Ajoute un message à la liste

  def add_member(self, user):
      if isinstance(user, User) and user not in self.Members:
          self.Members.append(user)  # Ajoute un utilisateur à la liste des membres

  def get_messages(self):
    return [
      {
        "Id": message.Id,
        "Sender": {
            "Username": message.Sender.Username,
            "Password": message.Sender.Password
        },
        "Content": message.Content
      } for message in self.Messages
    ]
  
  def get_members(self):
    return [
      {
        "Username": member.Username,
        "Password": member.Password
      } for member in self.Members
    ]

