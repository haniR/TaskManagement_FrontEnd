import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectsService } from '../../../services/projects/projects.service';
import { Projects } from '../../../models/Projects';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { JwtService } from 'src/app/services/jwt.service';
import { UserService } from 'src/app/services/user/user.service';
import { User_projects } from 'src/app/models/user_projects';
import { GetListsService } from 'src/app/services/get-lists.service';

@Component({
  selector: 'app-users-project',
  templateUrl: './users-project.component.html',
  styleUrls: ['./users-project.component.css']
})
export class UsersProjectComponent implements OnInit {
  usersProject: User_projects[]
  modalRef: BsModalRef;
  editedUser = new User();
  selectedUser;
  project$: Projects[];
  newUser: any = {};
  successMsg: string
  project: any
  id: number
  userLoggrdIn: any
  userType: String
  admins: any
  usersRemainingFromDelete: any
  userExist: any = []
  projectId: number
  deletedUser:any = {}


  constructor(private modalService: BsModalService,
    private route: ActivatedRoute, private router: Router,
    private userService: UserService, private getListsService: GetListsService, private projectService: ProjectsService, private jwtservice: JwtService) { }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.userService.userExistForProject(this.id).then((data: User[]) => {
      this.userExist = data
      console.log(this.userExist)
    }).catch((err) => {
    });
  }
  deleteModel(template: TemplateRef<any>,deleteUser:User) {
    this.modalRef = this.modalService.show(template);
    this.getListsService.usersProject(this.id).then(data => {
      this.usersRemainingFromDelete = data
      this.deletedUser.from = deleteUser.id
      // this.deletedUser.to = this.usersRemainingFromDelete.id
    }).catch((err) => {

    })
  }
  openModal2(template2: TemplateRef<any>, oldUser: User) {
    this.modalRef = this.modalService.show(template2);
    this.selectedUser = oldUser;
    this.editedUser = Object.assign({}, oldUser)
    this.editedUser.updatedAt = new Date
    this.editedUser.updatedBy = this.id
  }
  ngOnInit() {
    this.id = this.route.snapshot.params['id']
    this.userType = localStorage.getItem('userType')
    this.userLoggrdIn = localStorage.getItem('userInfo')


    console.log(this.userType)


    this.userService.usersProjects(this.id).then((data: User_projects[]) => this.usersProject = data).catch((err) => {
    });
    this.userService.usersProjects(this.id).then((data: User_projects[]) => this.usersProject = data).catch((err) => {
    });


    console.log(this.id)


  }
  refreshData() {

    this.userService.usersProjects(this.id).then((data: User_projects[]) => this.usersProject = data).catch((err) => {
    });
    this.userService.usersProjects(this.id).then((data: User_projects[]) => this.usersProject = data).catch((err) => {
    });

  }




  add() {
    this.id = this.route.snapshot.params['id']
    this.newUser.projectsId = this.id
    console.log("Result")

    console.log(this.newUser)
    this.userService.addUserToProject(this.newUser).then((data: User_projects) => {
      this.usersProject.push(data);
      // this.usersProject = data
      this.modalRef.hide();
      this.modalRef = null;
      this.newUser = new User_projects();
    }).catch((err) => {
    });

  }
  deleteUserFromProject() {
    this.projectId = this.id
    this.projectService.deleteUserFromProject(this.deletedUser.from,this.deletedUser.to,this.projectId).then((data) => {
      this.newUser = [];
      this.refreshData();
      this.modalRef.hide();
      this.modalRef = null;

    }).catch((err) => {

    });
  }
  edit() {
    
    this.userService.update(this.editedUser).then((data) => {
      this.refreshData();
    }).catch((err) => { });
    this.selectedUser = new User();
    this.editedUser = new User();
    this.modalRef.hide();

  }

  cancel() {
    this.modalRef.hide();
    this.modalRef = null;
    this.newUser = new User();

  }
}
