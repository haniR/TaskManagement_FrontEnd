import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Router, ActivatedRoute } from '@angular/router';

import { JwtService } from 'src/app/services/jwt.service';
import { TasksService } from 'src/app/services/tasks/tasks.service';
import { Tasks } from 'src/app/models/Tasks';
import { GetListsService } from 'src/app/services/get-lists.service';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css']
})
export class TasksListComponent implements OnInit {

  tasks: Tasks[]
  modalRef: BsModalRef;
  editedTask = new Tasks();
  selectedTask;
  newTask = new Tasks();
  id: number
  userLoggrdIn: any
  userType: String
  userId: any
  types: any
  priorities: any
  statuses: any
  usersProject: any
  selectedFiltered: any = {
    type : "",
    priority:"",
    status:"",
    assign:0
  }
  newTaskFiltered: any = {}
  
  


  constructor(private modalService: BsModalService,
    private route: ActivatedRoute, private router: Router,
    private tasksService: TasksService, private getListsService: GetListsService, private jwtservice: JwtService) { }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  openModal2(template2: TemplateRef<any>, oldTask: Tasks) {
    this.modalRef = this.modalService.show(template2);
    this.selectedTask = oldTask;
    this.editedTask = Object.assign({}, oldTask)
    this.editedTask.updatedAt = new Date
    this.editedTask.updatedBy = this.id


  }
  ngOnInit() {
    this.id = this.route.snapshot.params['id']
    this.userType = localStorage.getItem('userType')
    this.userLoggrdIn = localStorage.getItem('userInfo')
    this.getListsService.types().then(data => this.types = data).catch((err) => {

    })
    this.getListsService.priorities().then(data => this.priorities = data).catch((err) => {

    })
    this.getListsService.statuses().then(data => this.statuses = data).catch((err) => {

    })
    this.getListsService.usersProject(this.id).then(data => {
      this.usersProject = data
    }).catch((err) => {

    })


    console.log(this.userType)


    this.tasksService.list(this.id).then((data: Tasks[]) => this.tasks = data).catch((err) => {
    })
    console.log(this.id)


  }
  filter() {
    this.selectedFiltered.projectId = this.id
    console.log(this.selectedFiltered.type)
    console.log(this.selectedFiltered.priority)
    console.log(this.selectedFiltered.status)
    console.log(this.selectedFiltered.assign)


    this.tasksService.listFilter(this.selectedFiltered).then((data: Tasks[]) => {
      this.tasks = data
    }).catch((err) => { });
  }

  refreshData() {

    this.tasksService.list(this.id).then((data: Tasks[]) => this.tasks = data).catch((err) => {
    })

  }




  add() {
    this.newTask.projectId = this.id
    this.tasksService.add(this.newTask).then((data: any) => {
      this.tasks.push(data);
      this.modalRef.hide();
      this.modalRef = null;
      this.newTask = new Tasks();
    }).catch((err) => {
    });

  }
  deleteTask(task) {
    this.tasksService.delete(task.id).then((data) => {
      this.tasks = [];
      this.refreshData();
    }).catch((err) => {

    });
  }
  edit() {
    this.tasksService.update(this.editedTask).then((data) => {
      this.refreshData();
    }).catch((err) => { });
    this.selectedTask = new Tasks();
    this.editedTask = new Tasks();
    this.modalRef.hide();

  }

  cancel() {
    this.modalRef.hide();
    this.modalRef = null;
    this.newTask = new Tasks();

  }
  openTask(task) {
    this.router.navigate(['/task', task.id]);

  }

}
