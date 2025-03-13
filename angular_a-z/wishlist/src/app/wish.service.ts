// Generated with the terminal command `ng generate service Wish`

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WishService {

  constructor(private http: HttpClient) { }

  getWishes() {
    // The get method returns an observable, and by calling the get method (alone), the actual request hasn't been sent yet.
    // Since it is an observable, you can call the subscribe method. The request is sent once the subscribe method is called.
    // Note that this is applicable to any method called (GET, POST, PATCH, DELETE, etc)
    return this.http.get('assets/wishes.json');
  }
}
