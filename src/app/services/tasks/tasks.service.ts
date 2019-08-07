import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class TasksService {


  constructor(private httpService: HttpService) { }

  list(id) {
    return this.httpService.get(`/tasks/${id}`);
  }
  listFilter(data) {
    return this.httpService.post(`/tasks/filter`,data);
  }
  taskInfo(id) {
    return this.httpService.get(`/tasks/task/${id}`);
  }

  delete(id) {
    return this.httpService.delete(`/tasks/${id}`);
  }

  update(task) {
    return this.httpService.put('/tasks', task);
  }

  add(task) {
    return this.httpService.post('/tasks', task);

  }
  projectCharts(prjectId) {
    return this.httpService.get(`/tasks/a/${prjectId}`);
  }

}
