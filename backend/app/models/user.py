from werkzeug.security import generate_password_hash


class User:
  def __init__(self, Username, Email):
    self.Username = Username
    self.Email = Email

  def to_dict(self):
    return {
      'Username': self.Username,
      'Email': self.Email
    }
