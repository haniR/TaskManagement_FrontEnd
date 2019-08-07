import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { JwtModule } from '@auth0/angular-jwt';
import { ChartsModule } from 'ng2-charts';


import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { ProjectsListComponent } from './components/projects/projects-list/projects-list.component';
import { TasksListComponent } from './components/tasks/tasks-list.component';

import { AttachementsComponent } from './components/attachements/attachements.component';
import { UserComponent } from './components/user/user.component';
import { TaskComponent } from './components/tasks/task/task.component';
import { LightboxModule } from 'ngx-lightbox';

import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { UsersProjectComponent } from './components/user/users-project/users-project.component';
import { UserViewComponent } from './components/user/user-view/user-view.component';
import { CommentComponent } from './components/comment/comment.component';
import { UserTabComponent } from './components/user/user-tab/user-tab.component';
import { ProjectViewComponent } from './components/projects/project-view/project-view.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    ProjectsListComponent,
    UserComponent,
    TasksListComponent,
    UserTabComponent,
    AttachementsComponent,
    TaskComponent,
    CommentComponent,
    UserViewComponent,
    UsersProjectComponent,
    ProjectViewComponent
    
  ],
  imports: [
    LightboxModule,
    BrowserModule,
    AppRoutingModule,
    ModalModule.forRoot(),
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({ positionClass: 'toast-top-right', preventDuplicates: true}),
    JwtModule.forRoot({
      config: {
        tokenGetter: function tokenGetter() {
          return localStorage.getItem('access_token');
        },
        whitelistedDomains: ['localhost:8080'],
        blacklistedRoutes: ['http://localhost:8080/login']
      }
    }),
    ToastrModule.forRoot({ positionClass: 'toast-top-right', preventDuplicates: true}),
    ChartsModule,
    TypeaheadModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
