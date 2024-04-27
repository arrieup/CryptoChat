import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ConnexionService {
  
  constructor(
    private httpClient: HttpClient
  ) { }

  public getTime() : Observable<any>{
    return this.httpClient.get<any>(environment.url)
    .pipe(
      tap(_ => console.log('Time fetched'))
    );
  }
}