import uuid
from app.models import User, Message, Chat


user1 = User("user1", "password1")
user2 = User("user2", "password2")
user3 = User("user3", "password3")
user4 = User("user4", "password4")

message1 = Message(uuid.uuid4(), user1, "Hello there!")
message2 = Message(uuid.uuid4(), user2, "General Kenobi!")
message3 = Message(uuid.uuid4(), user3, "Hey!")
message4 = Message(uuid.uuid4(), user4, "Hi!")

chat_messages = [message1, message2, message4, message1, message3]
chat_msg = chat_messages
chat_msg.reverse()

chat_members = [user1, user2, user3]

chat1 = Chat(uuid.uuid4(), "Dummy Chat", "dummy_password", user1, chat_messages, chat_members)
chat2 = Chat(uuid.uuid4(), "Dummy Chat", "dummy_password", user1, chat_msg, chat_members)

database = [chat1,chat2]