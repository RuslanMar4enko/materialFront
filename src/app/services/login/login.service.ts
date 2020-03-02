import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Auth} from '../../model/auth';
import {AuthCredential} from '../../model/auth-credential';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(user: AuthCredential): Observable<Auth> {
    return this.http.post<Auth>('auth/login', user);
  }

  public refreshToken(): Observable<Auth> {
    return this.http.post<Auth>('auth/refresh', '').pipe(
      map(response => {
        return response;
      })
    );
  }

  public logout(): Observable<any> {
    return this.http.get<any>('logout');
  }

  public getToken(): string {
    return localStorage.getItem('access_token');
  }

  public isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token;
  }

}
