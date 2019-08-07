import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http: HttpService) { }


  list() {
    return this.http.get("/Users")
  }
  add(data) {
    return this.http.post("/Users", data);
  }
  delete(data) {
    return this.http.delete("/Users/" + data);
  }
  update(data) {
    return this.http.post("/users/update", data);
  }
  projectUsers(id) {
    return this.http.get(`/Users/${id}`);
  }
  usersProjects(id) {
    return this.http.get(`/UsersProject/${id}`);
  }
  userExistForProject(id) {

    return this.http.get(`/UsersExist/${id}`);
  }
  addUserToProject(data) {
    return this.http.post("/userToProject", data);

  }
  userCard(id) {
    return this.http.get(`/UserCard/${id}`);
  }
  login(username, password) {
    return this.http.get(`/login/${username}/${password}`);
  }
  charts(userid) {
    return this.http.get(`/tasks/user/${userid}`);
  }

}