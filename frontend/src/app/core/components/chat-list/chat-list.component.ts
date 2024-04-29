import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Chat } from '../../models/chat.model';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.sass']
})
export class ChatListComponent {

  @Output() chatSelected = new EventEmitter<Chat>(); 

  @Input() chatList : Array<Chat> = []

  selectChat(chat: string) {
    this.chatSelected.emit(this.chatList.find(c => c.Id == chat)!);
  }
}
