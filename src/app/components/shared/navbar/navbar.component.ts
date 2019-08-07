import { Component, OnInit } from '@angular/core';
import { JwtService } from 'src/app/services/jwt.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  // islogin:boolean
  constructor(private jwtService:JwtService,private route:ActivatedRoute ) { }
  logginId:any
  logginUser:any
  ngOnInit() {
  //  this.jwtService.loggedIn();
   this.logginId=localStorage.getItem('userId')
   this.logginUser=JSON.parse(localStorage.getItem('userInfo'))
   console.log(localStorage)
   console.log(this.logginUser.src +" this is ")
  }
  logout() {
    setTimeout(() => {
      this.jwtService.logout();
    }, 5000)

  }

}
