import { Component, Input } from '@angular/core';
import { Chat } from '../../models/chat.model';
import { ConnexionService } from '../../services/connexion.service';
import { MessageService } from '../../services/message.service';
import { Message } from '../../models/message.model';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.sass']
})
export class ChatComponent {

  @Input() Chat : Chat = new Chat("-NwZpZBKy1wO6vT3CgLF");

  constructor(private connexionService : ConnexionService, private messageService : MessageService){
  }

  public getChat() {
    this.messageService.getChat(this.Chat.Id).subscribe(
      chat => {
        console.log(chat)
        this.Chat = chat;
      }
    );
  }

  public sendMessage() {
    this.messageService.sendChatMessage(this.Chat.Id, new Message("ad123",new User("Pablo","pwd"),"Bonjour la mif")).subscribe(
      ret => {
        console.log(ret)
      }
    );
  }

  public getMessage() {
    this.messageService.getChatMessages(this.Chat.Id).subscribe(
      chatMessages => {
        this.Chat.Messages = chatMessages
      }
    );
  }
}
