import { Component } from '@angular/core';
import { ConnexionService } from '../../services/connexion.service';
import { Message } from '../../models/message.model';
import { User } from '../../models/user.model';
import { Chat } from '../../models/chat.model';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.sass']
})
export class MessageComponent {

  public Chat : Chat;

  constructor(private messageService : MessageService){
    this.Chat = new Chat();
    messageService.getChatMessages(0).subscribe(chatData => {
      this.Chat.AddMessages(chatData);
      console.log(Chat)
    });

  }

}
