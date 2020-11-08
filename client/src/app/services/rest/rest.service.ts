import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { switchMap, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  baseApi = '';
  baseUrl = '';
  authUrl = '';
  isLogin = false;
  headers = new Headers()
  currentHome;
  /**
   * Creates a new NameListService with the injected Http.
   */
  constructor() {
    this.baseUrl = environment.baseUrl;
  }

  setToken(token: string) {
    this.isLogin = true;
    this.headers.set('Authorization', token);
    localStorage.setItem('token', token);
  }

  checkLocalStorageToken() {
    const token = localStorage.getItem('token');
    console.log('token', token)
    if (token) {
      this.setToken(token);
      this.getCurrentHome();
    }
  }

  getCurrentHome() {
    const path = 'home'
    this.get(path).subscribe((success) => {
      this.currentHome = success;
    }, (error) => {
      console.log('error', error)
      this.logout();
    })
  }

  logout() {
    this.isLogin = false;
    this.setToken(null);
    localStorage.removeItem('token');
    location.reload();
  }

  /**
   * Returns an Observable for the HTTP GET request for the JSON resource.
   */
  get(path: string, search?: object, absoluteUrl?: boolean): Observable<any> {
    let queryParams = '';
    for (const key in search) {
      if (search.hasOwnProperty(key)) {
        const option = search[key];
        queryParams = `${queryParams ? queryParams + '&' : queryParams}${key}=${option}`;
      }
    }
    const finalUrl = `${path}?${queryParams}`;
    return this.request(finalUrl, 'Get', undefined, absoluteUrl);
  }

  /**
   * Returns an Observable for the HTTP POST request for the JSON resource.
   */
  post(path: string, body: object, absoluteUrl?: boolean): Observable<any> {
    return this.request(path, 'Post', body, absoluteUrl);
  }

  /**
   * Returns an Observable for the HTTP PUT request for the JSON resource.
   */
  put(path: string, body: object, params: object, absoluteUrl?: boolean): Observable<any> {
    let queryParams = '';
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        const option = params[key];
        queryParams = `${queryParams ? queryParams + '&' : queryParams}${key}=${option}`;
      }
    }
    const finalUrl = `${path}?${queryParams}`;
    return this.request(finalUrl, 'Put', body, absoluteUrl);
  }

  /**
   * Returns an Observable for the HTTP DELETE request for the JSON resource.
   */
  delete(path: string, absoluteUrl?: boolean): Observable<any> {
    return this.request(path, 'Delete', undefined, absoluteUrl);
  }

  /**
   * Actual rest request based on params
   */
  private request(
    path: string,
    method: string,
    body?: object,
    absoluteUrl?: boolean,
    isFile?: boolean,
  ): Observable<any> {
    const url = absoluteUrl ? path : `${this.baseUrl}${path}`;
    if (!isFile) {
      this.headers.set('Content-Type', 'application/json');
    }
    const options: any = {
      method,
      url,
      body: !isFile ? JSON.stringify(body) : body,
      headers: this.headers,
    };

    return fromFetch(url, options).pipe(
      switchMap(async (res: any) => {
        if (res.status >= 201 && res.status <= 226) {
          return;
        } else if (res.status === 200) {
          const result = res.json();
          return result;
        } else {
          const error = await res.json();
          throw (error);
        }
      })
    );
  }
}