import { Component } from '@angular/core';
import { Chat } from '../../models/chat.model';
import { ConnexionService } from '../../services/connexion.service';
import { MessageService } from '../../services/message.service';
import { Message } from '../../models/message.model';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.sass']
})
export class HomePage {

  chatList : Array<Chat> = [];
  selectedChat: Chat = new Chat();
  sidenavState : boolean = true;

  public constructor(private connexionService : ConnexionService, private messageService : MessageService){
    messageService.getAllChats().subscribe(
      chats => this.chatList = chats
    )
  }

  public refresh() {
    this.messageService.getAllChats().subscribe(
      chats => this.chatList = chats
    )
  }

  onChatSelected(chat: Chat) {
    this.selectedChat = chat;
  }

  onToggleSwitched(state: boolean){
    this.sidenavState = state
  }

  public sendMessage(idChat : string) {
    this.messageService.sendChatMessage(idChat,new Message("ad123",new User("Pablo","pwd"),"Bonjour la mif")).subscribe(
      ret => {
        console.log(ret)
      }
    );
  }

  public getChatMessages(idChat : string) {
    this.messageService.getChatMessages(idChat).subscribe(
      chatMessages => {
        console.log(chatMessages)
        this.chatList.find(x => x.Id == idChat)!.Messages = chatMessages
      }
    );
  }

  public getAllChats(){
    this.messageService.getAllChats().subscribe(
      chats => {
        this.chatList = chats;
      }
    );
  }
}
