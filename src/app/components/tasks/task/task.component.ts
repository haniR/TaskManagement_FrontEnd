import { Component, OnInit, TemplateRef } from '@angular/core';
import { TasksService } from 'src/app/services/tasks/tasks.service';
import { Tasks } from 'src/app/models/Tasks';
import { ActivatedRoute } from '@angular/router';
import { GetAttachementService } from 'src/app/services/get-attachement.service';
import { Attachements } from 'src/app/models/attahements';
import { HttpClient } from '@angular/common/http';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { GetListsService } from 'src/app/services/get-lists.service';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';



@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  modalRef: BsModalRef
  thisTask: any = []
  attachemnt = []
  selectedFile: File = null
  image: any
  attachment: Attachements = new Attachements()
  id: number
  types: any = []
  priorities: any = []
  statuses: any = []
  usersProject: any = []
  editedTask: any = []
  selectedTask;
  projectsId: number
  customSelected: string
  selectedFiltered:any={}


  constructor(private tasksService: TasksService, private attachementServices: GetAttachementService,
    private route: ActivatedRoute, private http: HttpClient, private getListsService: GetListsService, private modalService: BsModalService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id']
    this.tasksService.taskInfo(this.id).then((data: Tasks[]) => {
      this.thisTask = data
      this.projectsId = this.thisTask.projectId
      console.log(this.thisTask.projectId)
    }).catch((err) => {
    })
    this.attachementServices.AttachementsForTask(this.id).then((data: Attachements[]) => {
      this.attachemnt = data
      this.getListsService.usersProject(this.projectsId).then(data => {
        this.usersProject = data
      }).catch((err) => {

      })
      console.log(this.attachemnt)
    }).catch((err) => {
    })
    this.getListsService.types().then(data => this.types = data).catch((err) => {

    })
    this.getListsService.priorities().then(data => this.priorities = data).catch((err) => {

    })
    this.getListsService.statuses().then(data => this.statuses = data).catch((err) => {

    })



  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  openModal2(template2: TemplateRef<any>, oldTask: Tasks) {
    this.modalRef = this.modalService.show(template2);
    this.selectedTask = oldTask;
    this.editedTask = Object.assign({}, oldTask)
    this.editedTask.updatedAt = new Date
    this.editedTask.updatedBy = this.id
    this.editedTask.user_name = oldTask.user_name;



  }
 
  edit() {
    this.tasksService.update(this.editedTask).then((data) => {
      this.refreshDataTask();
    }).catch((err) => { });
    this.selectedTask = new Tasks();
    this.editedTask = new Tasks();
    this.modalRef.hide();

  }
  readAttachement(inputValue: any) {
    this.selectedFile = inputValue.target.files[0];

  }
  uploadtAttachements(): void {
    var myReader: FileReader = new FileReader();
    console.log(this.selectedFile.name)


    myReader.onloadend = (e) => {
      this.image = myReader.result;
      this.attachment.tasksId = this.route.snapshot.params['id']
      this.attachment.name = this.selectedFile.name
      this.attachment.src = this.image
      this.http.post('http://localhost:8080/tm-backend/Attachement', this.attachment).subscribe((data:any) => this.attachemnt.push(data.data) )

    }
    myReader.readAsDataURL(this.selectedFile);
    this.modalRef.hide();
    this.modalRef = null;


  }
  deleteAttachement(attachement) {
    this.attachementServices.delete(attachement.id).then((data) => {
      this.attachemnt = [];
      this.refreshData()
    }).catch((err) => {

    });
  }
  refreshData() {
    this.attachementServices.AttachementsForTask(this.id).then((data: Attachements[]) => {
      this.attachemnt = data
      console.log(this.attachemnt)
    }).catch((err) => {
    })
  }
  refreshDataTask(){
    this.id = this.route.snapshot.params['id']
    this.tasksService.taskInfo(this.id).then((data: Tasks[]) => {
      this.thisTask = data
      this.projectsId = this.thisTask.projectId
      console.log(this.thisTask.projectId)
    }).catch((err) => {
    })
  }
  cancel() {
    this.modalRef.hide();
    this.modalRef = null;

  }
  typeaheadOnSelect(e: TypeaheadMatch): void {
    console.log('Selected value: ', e.value);
  }

}
