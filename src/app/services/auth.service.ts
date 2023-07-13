import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(@Inject(LOCAL_STORAGE) private localStorage: StorageService) { }


  validateLogin(email: string, password: string): boolean {
    console.log(email, password);
    const users = this.localStorage.get('form-data'|| '[]');

    console.log(users);
    const user = users.find((user: any) => user.email === email && user.password === password);

    return !!user;


  }
}
