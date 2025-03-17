// Generated with the terminal command `ng generate service Wish`

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { WishItem } from '../../shared/models/wishItem';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishService {

  constructor(private http: HttpClient) { }

  // Standard options for every request:
  private getStandardOptions() : any {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }
  }

  getWishes() {
    let options = this.getStandardOptions();

    // To define query parameters on the GET request, can use the HttpParams class. You pass in an object that has various options
    // A commonly used option is fromObject which will create url parameters FROM the object passed into fromObject
    //   where the property names are the URL parameter names and the values are the parameter values
    //   e.g. as below, this would generate the query parameter suffix `?format=json`
    options.params = new HttpParams({
      fromObject: {
        format: 'json'
      }
    })

    // The get method returns an observable, and by calling the get method (alone), the actual request hasn't been sent yet.
    // Since it is an observable, you can call the subscribe method. The request is sent once the subscribe method is called.
    // Note that this is applicable to any method called (GET, POST, PATCH, DELETE, etc).
    // In order to gracefully handle errors as they occur (logging, presenting user with better info), we are going to pipe them into the catchError operator
    // from rxjs which will call a function to handle it
    return this.http.get('assets/wishes.json', options).pipe(catchError(this.handleError));
  }

  // Error handler that is passed to the pipe to deal with Http errors that may be encountered on the GET request
  private handleError(error: HttpErrorResponse) {
    // if the error status = 0, it is NOT a server error, it is a client or network error this conditional is diagnostic logging info, not for the user
    if (error.status === 0) {
      console.error('There is an issue with the client or network: ', error.error);
    } else {
      console.error('Server-side Error: ', error.error);
    }

    // This throwError is to provide meaningful information to the user about what the problem is. throwError is functionality from rxJS
    // throwError gives us an observable that wraps around the error
    return throwError(() => new Error('Cannot retrieve wishes from the server. Please try again.'))

  }

  // Method set to private as there is no provision for POST to the json. Do not want this method to be called outside of the class
  private addWish(wish: WishItem) {
    let options = this.getStandardOptions();

    options.headers = options.headers.set('Authorization', 'value-needed-for-authorization')
    this.http.post('assets/wishes.json', wish, options);
  }


}

// Due to not having an actual backend in this tutorial, only going to be making GET requests. However, the only real difference
// using the HttpClient between a GET and other request types (e.g. POST) is that you provide the body as the second argument and options
// as the 3rd argument when calling the method ->
// e.g. this.http.post(url, body, options)
