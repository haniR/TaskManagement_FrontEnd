import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  constructor(private http: HttpService) { }


  list(){
    return this.http.get("/Comments")
  }
  add(data){
    return this.http.post("/Comments/add",data);
  }
  delete(data){
    return this.http.delete("/Comments/"+data);
  }
  update(data){
    return this.http.post("/Comments/update",data);
  }
 
}
