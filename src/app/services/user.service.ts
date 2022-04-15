import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RegisteForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { tap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

const base_url = environment.base_url;

declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public auth2: any;
  public user: User;

  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.googleInit();
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid(): string {
    return this.user.uid || '';
  }

  googleInit() {
    return new Promise( resolve => {
      gapi.load('auth2', () => {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id: '65010213192-8qc7095rd1h4mf5raiv6602rtrvbcegj.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
        resolve('auth 2');
      });
    });
  }

  logout() {
    localStorage.removeItem('token');

    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      });
    });
  }

  validToken(): Observable<boolean> {

    return this.http.get(`${base_url}/login/renew`, {
      headers: {'x-token': this.token}
    })
    .pipe(
      map((resp: any) => {
        const { email, google, name, role, img = '', uid } = resp.user;
        this.user = new User(name, email, role, img, '', google, uid);
        console.log(resp);
        localStorage.setItem('token', resp.token );
        return true;
      }),
      catchError(err => of(false))
    );
  }

  updateProfile( data: { email: string, name: string, role: string } ) {
    data = {
      ...data,
      role: this.user.role
    };
    return this.http.put(`${base_url}/users/${this.uid}`, data, {
      headers: {'x-token': this.token}
    });
  }

  createUser( formData: RegisteForm ) {
    return this.http.post(`${base_url}/users`, formData)
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token);
        })
      );
  }

  loginUser(formData: LoginForm ) {
    return this.http.post(`${base_url}/login`, formData)
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token);
        })
      );
  }

  loginGoogle(token) {
    return this.http.post(`${base_url}/login/google`, { token })
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token);
        })
      );
  }
}
