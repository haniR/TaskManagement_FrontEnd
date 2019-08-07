import { Injectable } from '@angular/core';
import { HttpService } from './http/http.service';

@Injectable({
  providedIn: 'root'
})
export class GetAttachementService {

  constructor(private httpService: HttpService) { }

  list(id) {
    return this.httpService.get(`/tasks/${id}`);
  }
  AttachementsForTask(id) {
    return this.httpService.get(`/AttachmentsTask/${id}`);
  }

  delete(id) {
    return this.httpService.delete(`/Attachment/${id}`);
  }

  update(task) {
    return this.httpService.put('/tasks', task);
  }

  add(task) {
    return this.httpService.post('/tasks', task);

  }}
