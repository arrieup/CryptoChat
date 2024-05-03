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

  @Input() Chat : Chat = new Chat();

  complementaryState : boolean = false;

  newMessage: Message = new Message();

  constructor(private connexionService : ConnexionService, private messageService : MessageService){
  }
  public toggleComplementaryInfo() {
    this.complementaryState = !this.complementaryState;
  }


  public getChat() {
    this.messageService.getChat(this.Chat.Id).subscribe(
      chat => {
        console.log("init")
        this.Chat = chat;
      }
    );
  }

  public sendMessage() {
    this.messageService.sendChatMessage(this.Chat.Id, this.newMessage).subscribe(
      ret => {
        console.log(ret)
      }
    );
  }

  public getMessages() {
    this.messageService.getChatMessages(this.Chat.Id).subscribe(
      chatMessages => {
        console.log(chatMessages)
        this.Chat.Messages = chatMessages
      }
    );
  }
}
