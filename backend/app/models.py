class User:
  def __init__(self, Username : str, Password : str):
    self.Username = Username
    self.Password = Password

  def toDict(self):
    return {
            'Username': self.Username,
            'Password': self.Password
    }

class Message:
  def __init__(self, Id : str, Sender : User, Content : str):
    self.Id = Id
    self.Sender = Sender
    self.Content = Content

  def toDict(self):
    return {
            'Id': self.Id,
            'Sender': self.Sender.toDict(), 
            'Content': self.Content
    }

class Chat:
  def __init__(self, Id : str, Name : str, Password : str, Creator : User, Messages : list, Members : list):
    self.Id = Id
    self.Name = Name
    self.Password = Password
    self.Creator = Creator
    self.Messages = Messages
    self.Members = Members

  def toDict(self):
    msg_dict = []
    for msg in self.Messages:
      msg_dict.append(msg.toDict())
    return {
            'Id': self.Id,
            'Name': self.Name, 
            'Password': self.Password, 
            'Creator': self.Creator.toDict(), 
            'Messages': msg_dict
    }

  def addMessage(self,Msg : Message ):
    self.Messages.append(Msg)

  def getMessages(self):
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
  
  def getMembers(self):
    return [
      {
        "Username": member.Username,
        "Password": member.Password
      } for member in self.Members
    ]