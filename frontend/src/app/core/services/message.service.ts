import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Message } from '../models/message.model';
import { User } from '../models/user.model';
import { Chat } from '../models/chat.model';


const httpOptions = {
  headers: new HttpHeaders({
    'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImEyMzhkZDA0Y2JhYTU4MGIzMDRjODgxZTFjMDA4ZWMyOGZiYmFkZGMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vY3J5cHRvY2hhdC1mYWU0ZCIsImF1ZCI6ImNyeXB0b2NoYXQtZmFlNGQiLCJhdXRoX3RpbWUiOjE3MTQzMTY0NDcsInVzZXJfaWQiOiJITUlpNGFjYlJNTjl1YVpueWxzeEFMVUFYTzkzIiwic3ViIjoiSE1JaTRhY2JSTU45dWFabnlsc3hBTFVBWE85MyIsImlhdCI6MTcxNDMxNjQ0NywiZXhwIjoxNzE0MzIwMDQ3LCJlbWFpbCI6ImFycmlldXBAZXhhbXBsZS5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsiYXJyaWV1cEBleGFtcGxlLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.cGz2WJGpzVIBsu1N57fasJPyLaipQ-vRC9793slqxgtHGwACWyDEL0rYmPd2mtKNOZyYP1ziga42rsLqc9q4BDf1fXPZViCvTmJ99bFHiDA-qfd-UYfBmRniAwPIrYuTfvMkffuncb-hseLaoxhM6XrYufFU7h1xMZjd1FyaBOrZ_jR7-tubusV78C3QdRRYC4JLgsS74BFDSIL4vCtPs66Ud9DTh4oN3kIZh3lfsl_fpWzwg39rrDAhqeV7mHVxYXxdukn-h_HQ_N99Rf6AdJ_AlRhhb19rE73X9jqzgrwgqUodO3svJvs1niQYFfiA6Q2TBUV6xMqn95pYUAspFQ',
    'Content-Type': 'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class MessageService {

  
  constructor(
    private httpClient: HttpClient
  ) {
   }

  public sendChatMessage(idChat : string, msg : Message) : Observable<number> {
    return this.httpClient.post<number>(environment.url+"chat/"+idChat+"/messages/create/", msg, httpOptions)
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
    return this.httpClient.get<Chat>(environment.url+"chat/"+id+"/read", httpOptions)
    .pipe(
      tap(_ => console.log('Message fetched'))
    );
  }

  public getAllChats() : Observable<Array<Chat>>{
    return this.httpClient.get<Array<Chat>>(environment.url+"chat/all", httpOptions)
    .pipe(
      tap(_ => console.log('All chats fetched'))
    );
  }

  public getChatMessages(id: string) : Observable<Array<Message>>{
    return this.httpClient.get<Array<Message>>(environment.url+"chat/"+id+"/messages/read", httpOptions)
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
