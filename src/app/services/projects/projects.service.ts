import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(private httpService: HttpService) { }

  list() {
    return this.httpService.get('/projects');
  }

  delete(id) {
    return this.httpService.delete(`/projects/${id}`);
  }

  update(project) {
    return this.httpService.put('/projects', project);
  }

  add(project) {
    return this.httpService.post('/projects', project);

  }
  userProjects(id) {
    return this.httpService.get(`/projects/${id}`);
  }
  getAdmins(){
    return this.httpService.get(`/admins`);

  }
  deleteUserFromProject(from,to,projectId) {
    return this.httpService.delete(`/User/${from}/${to}/${projectId}`);
  }
}
