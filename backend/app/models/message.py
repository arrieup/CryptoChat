import uuid
from app.models.user import User


class Message:
  def __init__(self, Id : str, Sender : User, Content : str):
    self.Id = Id if (Id != "") else str(uuid.uuid4())
    self.Sender = Sender
    self.Content = Content

  def to_dict(self):
    return {
            'Id': self.Id,
            'Sender': self.Sender.to_dict(), 
            'Content': self.Content
    }
