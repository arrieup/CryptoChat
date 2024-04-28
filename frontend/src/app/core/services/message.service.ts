import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Message } from '../models/message.model';
import { User } from '../models/user.model';
import { Chat } from '../models/chat.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  
  constructor(
    private httpClient: HttpClient
  ) { }

  public sendMessage(idChat : number, msg : Message) : Observable<number> {
    return this.httpClient.post<number>(environment.url+idChat+"/create", msg)
    .pipe(
      tap(_ => console.log('Message posted'))
    );
  }

  public getMessage(idChat : number,id : number) : Observable<string>{
    return this.httpClient.get<string>(environment.url+"/chat/"+idChat+"message/"+id)
    .pipe(
      tap(_ => console.log('Message fetched'))
    );
  }

  public postChat(chat : Chat) : Observable<boolean> {
    console.log(chat);
    return this.httpClient.post<boolean>(environment.url+"chat/post", chat)
    .pipe(
      tap(_ => console.log('Chat posted'))
    );
  }

  public getChat(id : number) : Observable<Chat>{
    return this.httpClient.get<Chat>(environment.url+"chat/"+id)
    .pipe(
      tap(_ => console.log('Message fetched'))
    );
  }

  public getChatMessages(id: number) : Observable<Array<Message>>{
    return this.httpClient.get<Array<Message>>(environment.url+"chat/"+id+"/messages")
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
