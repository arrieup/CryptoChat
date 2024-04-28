import { Component } from '@angular/core';
import { ConnexionService } from './core/services/connexion.service';
import { MessageService } from './core/services/message.service';
import { Message } from './core/models/message.model';
import { User } from './core/models/user.model';
import { Chat } from './core/models/chat.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'CryptoChat';
  time = "";
  localChat = new Chat();
  database : Array<Chat> = [];
  constructor(private connexionService : ConnexionService, private messageService : MessageService){
  }

  public sendMessage(idChat : string) {
    this.messageService.sendChatMessage(idChat,new Message("ad123",new User("Pablo","pwd"),"Bonjour la mif")).subscribe(
      ret => {
        console.log(ret)
        this.time = "Bien arrivé : " + ret;
      }
    );
  }

  public getMessage() {
    this.messageService.getChatMessages('-NwZpZBKy1wO6vT3CgLF').subscribe(
      chatMessages => {
        console.log(chatMessages)
        this.localChat.SetMessages(chatMessages);
      }
    );
  }
  public getMembers() {
    this.messageService.getChatMembers(0).subscribe(
      chatMembers => {
        this.localChat.Members = chatMembers;
      }
    );
  }

  public addChat(){
    this.messageService.postChat(new Chat("123456","Les loulous", "password", new User("Pablo Arrieumerlou","pwd"))).subscribe(
      ret => {
        this.time = "Bien arrivé ! ";
      }
    );
  }

  getAllChats(){
    this.messageService.getAllChats().subscribe(
      chats => {
        this.database = chats;
      }
    );
  }

  public getChat() {
    this.messageService.getChat("1").subscribe(
      chat => {
        this.localChat = chat;
      }
    );
  }
}
