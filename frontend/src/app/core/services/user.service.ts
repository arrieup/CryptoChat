import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  Users : Array<User>

  constructor(
    private httpClient : HttpClient) {
    this.Users = []
  }

  public getUsers() : Observable<Array<User>>{
    return this.httpClient.get<Array<User>>(environment.url+"user/all")
    .pipe(
      tap(_ => console.log('All users fetched'))
    );
  }
  public getUser(id : number) : Observable<User>{
    return this.httpClient.get<User>(environment.url+"user/get/"+id)
    .pipe(
      tap(_ => console.log('User fetched'))
    );
  }
  public postUser(user : User) : Observable<boolean> {
    return this.httpClient.post<boolean>(environment.url+"user/post", user)
    .pipe(
      tap(_ => console.log('Message fetched'))
    );
  }
}
