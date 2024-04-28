import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';


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

  public getTime() : Observable<any>{
    return this.httpClient.get<any>(environment.url)
    .pipe(
      tap(_ => console.log('Time fetched'))
    );
  }

  public login(email : string, password : string) {
    let body = {"Email": email, "Password": password}
    this.httpClient.post<any>(environment.url+"user/login", body, ConnexionService.httpOptions)
    .pipe(
      tap(_ => console.log('Login successful'))
    )
    .subscribe(
      data => {
        const updatedHeaders = ConnexionService.httpOptions.headers.set('Authorization', 'Bearer ' + data['user']['idToken']);
        ConnexionService.httpOptions = { headers : updatedHeaders};
      }
    )
  }

  public register(email : string, password : string) {
    let body = {"Email": email, "Password": password}
    this.httpClient.post<any>(environment.url+"user/register", body, ConnexionService.httpOptions).subscribe(
      data => {
        const updatedHeaders = ConnexionService.httpOptions.headers.set('Authorization', 'Bearer ' + data['user']['idToken']);
        ConnexionService.httpOptions = { headers : updatedHeaders};
      }
    )
  }
}