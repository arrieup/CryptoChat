import { Component, Input } from '@angular/core';
import { ConnexionService } from '../../services/connexion.service';
import { Message } from '../../models/message.model';
import { User } from '../../models/user.model';
import { Chat } from '../../models/chat.model';
import { MessageService } from '../../services/message.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.sass'],
})
export class MessageComponent {
  @Input() public Message : Message = new Message()

  constructor(private messageService : MessageService){
  }

}
