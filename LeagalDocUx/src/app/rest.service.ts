import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Configuration } from './app.constants';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  private url: string;

  constructor(private http: HttpClient, private configuration: Configuration) {
    this.url = configuration.serverWithApiUrl;
  }

  public getAll<T>(ofwhat: string): Observable<T> {
    return this.http.get<T>(this.url + ofwhat);
  }

  public getSingle<T>(ofwhat: string, id: number): Observable<T> {
    return this.http.get<T>(this.url + ofwhat + id);
  }

  public add<T>(what: T): Observable<T> {

    return this.http.post<T>(this.url, what);
  }
/* need to enhance when the api is ready
  public update<T>(id: number, itemToUpdate: any): Observable<T> {
    return this.http
      .put<T>(this.url + id, itemToUpdate);
  }

  public delete<T>(id: number): Observable<T> {
    return this.http.delete<T>(this.url + id);
  } */
}
