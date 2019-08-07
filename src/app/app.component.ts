import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { UserService } from './services/user/user.service';
import { ActivatedRoute } from '@angular/router';
import { UserCard } from './models/UserCard';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private userService: UserService, private route: ActivatedRoute) {}
  title = 'taskmanagement-frontend';
  

  userId
  userCard 
 
  url 
  
 ngOnInit() {
  // var user = JSON.parse(localStorage.getItem('userInfo'));
 
  // this.url = user.scr
  this.url = "img48"
  // this.userId = user.id
  
  console.log("UserID")
  // console.log(this.userId)
 
 }

}
