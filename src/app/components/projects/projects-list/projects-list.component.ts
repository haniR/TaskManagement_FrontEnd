import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectsService } from '../../../services/projects/projects.service';
import { Projects } from '../../../models/Projects';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { JwtService } from 'src/app/services/jwt.service';


@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css']
})
export class ProjectsListComponent implements OnInit {

  // projects: Projects[]
  userProject: Projects[]
  modalRef: BsModalRef;
  editedProject = new Projects();
  selectedProject;
  project$: Projects[];
  newProject = new Projects();
  successMsg: string
  project: any
  id: number
  userLoggrdIn: any
  userType: String
  admins: any

  constructor(private modalService: BsModalService,
    private route: ActivatedRoute, private router: Router,
    private projectsService: ProjectsService, private jwtservice: JwtService) { }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  openModal2(template2: TemplateRef<any>, oldProject: Projects) {
    this.modalRef = this.modalService.show(template2);
    this.selectedProject = oldProject;
    this.editedProject.id = oldProject.id;
    this.editedProject.name = oldProject.name;
    this.editedProject.code = oldProject.code;
    this.editedProject.adminId = oldProject.adminId;
    this.editedProject.createdBy = oldProject.createdBy;
    this.editedProject.createdAt = oldProject.createdAt;
  }
  ngOnInit() {
    this.id = this.route.snapshot.params['id']
    this.userType = localStorage.getItem('userType')
    this.userLoggrdIn = localStorage.getItem('userInfo')


    console.log(this.userType)

    if (this.userType == "admin") {
      this.projectsService.list().then((data: Projects[]) => this.userProject = data).catch((err) => {
      });
    } else {
      this.projectsService.userProjects(this.id).then((data: Projects[]) => this.userProject = data).catch((err) => {
      });
    }
    console.log(this.id)
    this.projectsService.getAdmins().then((data) => {
      this.admins = data;
      this.refreshData();
    }).catch((err) => {

    });

  }
  refreshData() {

    if (this.userType == "admin") {
      this.projectsService.list().then((data: Projects[]) => this.userProject = data).catch((err) => {
      });
    } else {
      this.projectsService.userProjects(this.id).then((data: Projects[]) => this.userProject = data).catch((err) => {
      });
    }
  }




  add() {
    this.projectsService.add(this.newProject).then((data: any) => {
      this.userProject.push(data);
      this.userProject = data
      this.modalRef.hide();
      this.modalRef = null;
      this.newProject = new Projects();
    }).catch((err) => {
    });

  }
  deleteProject(project) {
    this.projectsService.delete(project.id).then((data) => {
      this.userProject = [];
      this.refreshData();
    }).catch((err) => {

    });
  }
  edit() {
    this.projectsService.update(this.editedProject).then((data) => {
      this.refreshData();
    }).catch((err) => { });
    this.selectedProject = new Projects();
    this.editedProject = new Projects();
    this.modalRef.hide();

  }

  cancel() {
    this.modalRef.hide();
    this.modalRef = null;
    this.newProject = new Projects();

  }

}
