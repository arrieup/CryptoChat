import uuid

class User:
  def __init__(self, username : str, password : str):
    self.Name = username
    self.Password = password

class Message:
  def __init__(self, id : uuid, sender : User, content : str):
    self.Id = id
    self.Sender = sender
    self.Content = content

class Chat:
  def __init__(self, id : uuid, name : str, password : str, creator : User, messages : list, members : list):
    self.Id = id
    self.Name = name
    self.Password = password
    self.Creator = creator
    self.Messages = messages
    self.Members = members