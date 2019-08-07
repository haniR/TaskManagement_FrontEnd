
import { Component, OnInit, TemplateRef, ViewChild, ɵConsole, Input } from '@angular/core';
import { ModalModule, BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { HttpService } from '../../services/http/http.service';

import { ToastrModule, ToastrService, ToastContainerDirective } from 'ngx-toastr';
import { UserService } from '../../services/user/user.service';
import { ProjectsService } from '../../services/projects/projects.service'
import { Projects } from '../../models/Projects';
import { DatePipe, formatDate } from '@angular/common';
import { User } from 'src/app/models/user';
//import {encode, decode} from 'node-base64-image';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [DatePipe]
  
})
export class UserComponent implements OnInit {
  info
  file: File;
  ff:any
  users: any
  userInfo = new User()
  newUser = {
    id: '',
    name: '',
    userName: '',
    dateOfBirth: '',
    type: '',
    password: '',
    src: ''


  }
  selected: any = {
    id: '',
    name: '',
    userName: '',
    dateOfBirth: '',
    type: '',
    password: '',
    src: '',
    createdAt: '',
    createdBy: '',
    updatedAt: '',
    updatedBy: ''

  }

  enable: boolean = false
  admin: boolean = true
  createdAt = new Date();
  updatedAt = new Date();
  now = new Date();
  projects: Projects[];
  modalRef: BsModalRef;
  constructor(private modalService: BsModalService, private http: HttpService
    , private userService: UserService, private projectService: ProjectsService
    , private toastr: ToastrService, private toastrService: ToastrService) {

    this.fillUsers();

  }

  fillUsers() {

    this.userService.list().then((data) => {
      this.users = data;

      // console.log(this.users);
    }).catch((err) => {

    });
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  save() {
    if (!(this.newUser.name == "" || this.newUser.dateOfBirth == ''
      || this.newUser.type == '' || this.newUser.userName == ''
      || this.users.src === '' || this.users.password == '')) {

         this.newUser.src = this.ff
      // console.log(this.users);
      // this.users.createdAt = this.dateFormat;
      this.userService.add(this.newUser).then((data1) => {
        //console.log(data1);
        this.users.push(data1);
      }).catch((err) => {
      });
    }
    else {
      this.toastr.error("Empty Field", "ERROR");


    }

  }


  cancel() {
    this.newUser.id = '',
      this.newUser.name = '',
      this.newUser.type = '',
      this.newUser.userName = '',
      this.newUser.dateOfBirth = ''
    for (var i = 0; i < this.users.length; i++) {
      this.users[i].checked = false;
    }

  }


  checkRow(row) {


    for (var i = 0; i < this.users.length; i++) {
      this.users[i].checked = false;

    }
    row.checked = true;
    this.enable = true;
    this.selected.id = row.id;
    // console.log(this.selected.id)
    this.selected.name = row.name;
    this.selected.dateOfBirth = row.dateOfBirth;
    this.selected.userName = row.userName;
    this.selected.type = row.type;
    // 

    // 

    this.userService.projectUsers(row.id).then((data: Projects) => {
      this.projects.push(data);
      //console.log(this.users);
    }).catch((err) => {

    });
  }

  editt() {
    for (var i = 0; i < this.users.length; i++) {
      if (this.users[i].checked == true) {
        // console.log(this.users[i].id)
        if (!(this.selected.name == "" || this.selected.dateOfBirth == ''
          || this.selected.type == '' || this.selected.userName == ''
          || this.users.password == '')) {
          this.selected.updatedBy = this.userInfo.id
          this.selected.updatedAt = "12-12-2012"
          this.selected.src = this.ff
          
          
          this.userService.update(this.selected).then((data) => {
            // console.log(data);
            //this.users.push(data);
          }).catch((err) => {
          });
        }
        else {
          this.toastr.error("Empty Field", "ERROR");
        }
      }

    }


  }
  delete() {
    for (var i = 0; i < this.users.length; i++) {
      if (this.users[i].checked == true) {
        this.users.splice(i, 1);
      }
    }
    this.userService.delete(this.selected.id).then((data) => {
    }).catch((err) => {

    });


  }
   getBase64(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      console.log(reader.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
 }
 
onChange(event: EventTarget) {
     
      let eventObj: MSInputMethodContext = <MSInputMethodContext> event;
      let target: HTMLInputElement = <HTMLInputElement> eventObj.target;
      let files: FileList = target.files;
      this.file = files[0];
    
     var reader = new FileReader();
    reader.readAsDataURL(this.file);
    
    reader.onload = () => {
      this.ff = reader.result;
      //console.log(reader.result);
      console.log(this.ff)
     
    };
    reader.onerror =  (error)=> {
      console.log('File Error: ', error);
      
      
    };
  
  }

  ngOnInit() {
   
  }


}
