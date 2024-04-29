import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class ConnexionService {
  
  static httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private httpClient: HttpClient
  ) { }

  public static currentUser : User = new User()

  public login(email : string, password : string) : Observable<any>{
    let body = {"Email": email, "Password": password}
    return this.httpClient.post<any>(environment.url+"user/login", body)
    .pipe(
      tap(_ => console.log('Login successful'))
    )
  }

  public register(email : string, password : string) : Observable<any>{
    let body = {"Email": email, "Password": password}
    return this.httpClient.post<any>(environment.url+"user/register", body)
    .pipe(
      tap(_ => console.log('Register successful'))
    )
  }
}