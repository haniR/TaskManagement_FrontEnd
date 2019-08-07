import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { ActivatedRoute } from '@angular/router';
import { Projects } from 'src/app/models/Projects';
import { UserCard } from 'src/app/models/UserCard';

@Component({
  selector: 'app-user-tab',
  templateUrl: './user-tab.component.html',
  styleUrls: ['./user-tab.component.css']
})
export class UserTabComponent implements OnInit {

  id;
  userCard 
  userCardProjects
  userCardTasks
  enableTasks =false
  enableProjects =false
  userInfo = new UserCard()
 
  url 
  
  constructor(private userService :UserService,
    private route : ActivatedRoute) {
      
     }
    showUserProjects(){
      this.enableProjects = true
      this.enableTasks =false
      this.userService.userCard(this.id).then((data)=>{
        this.userCard = data
        this.userCardProjects = this.userCard.projects
        this.userCardTasks = this.userCard.tasks
      }).catch(err =>{

      })


    }

    showUsercard(){
      this.enableProjects = false
      this.enableTasks =true

      this.userService.userCard(this.id).then((data)=>{
        this.userCard = data
        this.userCardTasks = this.userCard.tasks
    
      }).catch(err =>{

      })


    }




  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    
    this.userService.userCard(this.id).then((data)=>{
       this.userCard = data
       this.userInfo.name = this.userCard.user.name 
       this.userInfo.dateOfBirth = this.userCard.user.dateOfBirth
       this.userInfo.type = this.userCard.user.type
       this.userInfo.userName = this.userCard.user.userName
       this.userInfo.src = this.userCard.user.src
       this.url = this.userCard.user.src
       
       
      }).catch(err =>{
        
      })
  }


}
