import uuid
from app.models.user import User


class Message:
  def __init__(self, sender: User, content: str):
    self.id = uuid.uuid4()
    self.sender = sender
    self.content = content

  def to_dict(self):
    return {
      'id': str(self.id),
      'sender': self.sender.to_dict(),
      'content': self.content,
    }
