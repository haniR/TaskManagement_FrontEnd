import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { error } from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})

export class JwtService {
  userLoggedIn: any
  public userType: String
  constructor(private httpClient: HttpClient, private router: Router, private toaster: ToastrService) { }
  login(username: string, password: string) {
    return this.httpClient.post('http://localhost:8080/tm-backend/login', { userName: username, password: password }).subscribe((res: any) => {
      this.userLoggedIn = res.data
      if (res.success) {
        this.userType = this.userLoggedIn.type
        localStorage.setItem('access_token', res.msg);
        localStorage.setItem('userInfo', JSON.stringify(this.userLoggedIn));
        localStorage.setItem('userType', this.userLoggedIn.type);
        this.toaster.success("Welcome", this.userLoggedIn.userName)
        localStorage.setItem('userId', this.userLoggedIn.id);
        this.router.navigate(['/projects', this.userLoggedIn.id])

      } else {
        this.toaster.error("error", "Wrong Username or Password")

      }
    }, (error) => {

    }


    )
  }
  logout() {
    localStorage.removeItem('access_token');
  }
  loggedIn() {
    let user = localStorage.getItem('access_token');
    return !(user === null)
  }
}