import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AsyncPipe, NgIf } from '@angular/common';
import { Chat } from '../../models/chat.model';
import { Message } from '../../models/message.model';
import { User } from '../../models/user.model';
import { ConnexionService } from '../../services/connexion.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  private breakpointObserver = inject(BreakpointObserver);

  
  chatList : Array<Chat> = [];
  selectedChat: Chat = new Chat();
  sidenavState : boolean = true;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
    
  
  public constructor(private connexionService : ConnexionService, private messageService : MessageService){
    messageService.getAllChats().subscribe(
      chats => {
        this.chatList = chats;
        this.selectedChat = this.chatList[0] != undefined ? this.chatList[0] : new Chat();
      }
    )
  }

  public refresh() {
    this.messageService.getAllChats().subscribe(
      chats => this.chatList = chats
    )
  }

  onChatSelected(chat: Chat) {
    this.messageService.getChat(chat.Id);
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
