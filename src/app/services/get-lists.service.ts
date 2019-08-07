import { Injectable } from '@angular/core';
import { HttpService } from './http/http.service';

@Injectable({
  providedIn: 'root'
})
export class GetListsService {

  constructor(private httpService: HttpService) { }

  types() {
    return this.httpService.get('/types');
  }

  priorities() {
    return this.httpService.get('/priorities');
  }
  statuses() {
    return this.httpService.get('/statuses');
  }
  usersProject(projectsId) {

    return this.httpService.get(`/UsersProject/${projectsId}`);

  }
}
