import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Message } from '../models/message.model';
import { User } from '../models/user.model';
import { Chat } from '../models/chat.model';
import { ConnexionService } from './connexion.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  
  constructor(
    private httpClient: HttpClient,
    private connexionService : ConnexionService
  ) {
  }

  public sendChatMessage(idChat : string, msg : Message) : Observable<number> {
    console.log(ConnexionService.httpOptions)
    return this.httpClient.post<number>(environment.url+"chat/"+idChat+"/messages/create/", msg, ConnexionService.httpOptions)
    .pipe(
      tap(_ => console.log('Message posted'))
    );
  }

  public postChat(chat : Chat) : Observable<boolean> {
    console.log(chat);
    return this.httpClient.post<boolean>(environment.url+"chat/post", chat)
    .pipe(
      tap(_ => console.log('Chat posted'))
    );
  }

  public getChat(id : string) : Observable<Chat>{
    console.log(id)
    return this.httpClient.get<Chat>(environment.url+"chat/"+id+"/read", ConnexionService.httpOptions)
    .pipe(
      tap(_ => console.log('Message fetched'))
    );
  }

  public getAllChats() : Observable<Array<Chat>>{
    return this.httpClient.get<Array<Chat>>(environment.url+"chat/all", ConnexionService.httpOptions)
    .pipe(
      tap(_ => console.log('All chats fetched'))
    );
  }

  public getChatMessages(id: string) : Observable<Array<Message>>{
    console.log(ConnexionService.httpOptions)
    return this.httpClient.get<Array<Message>>(environment.url+"chat/"+id+"/messages/read", ConnexionService.httpOptions)
    .pipe(
      tap(_ => console.log('Chat messages fetched'))
    );
  }

  public getChatMembers(id: number) : Observable<Array<User>>{
    return this.httpClient.get<Array<User>>(environment.url+"chat/"+id+"/members")
    .pipe(
      tap(_ => console.log('Chat members fetched'))
    );
  }
}
