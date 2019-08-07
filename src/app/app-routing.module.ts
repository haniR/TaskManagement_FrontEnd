import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ProjectsListComponent } from './components/projects/projects-list/projects-list.component';
import { UserComponent } from './components/user/user.component';
import { UserTabComponent } from './components/user/user-tab/user-tab.component';
import { TasksListComponent } from './components/tasks/tasks-list.component';
import { TaskComponent } from './components/tasks/task/task.component';
import { UsersProjectComponent } from './components/user/users-project/users-project.component';
import { CommentComponent } from './components/comment/comment.component';
import { UserViewComponent } from './components/user/user-view/user-view.component';
import { ProjectViewComponent } from './components/projects/project-view/project-view.component';

// import { AuthGuardComponent } from './auth-guard/auth-guard.component';


const routes: Routes = [

    { path: 'user_tab/:id', component: UserTabComponent },
    { path: 'dash', component: ProjectViewComponent },
    {
        path: '',
        component: LoginComponent,
    }, {
        path: 'user_tab/:id',
        component: UserTabComponent,
    },
    {
        path: 'comment',
        component: CommentComponent
    },
    {
        path: 'comment/:id',
        component: CommentComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'projects',
        component: ProjectsListComponent
    },
    {
        path: 'user',
        component: UserComponent
    },
    {
        path: 'user/:id',
        component: UserComponent
    },
    {
        path: 'projects/:id',
        component: ProjectsListComponent
    }, {
        path: 'tasks/:id',
        component: TasksListComponent
    }, {
        path: 'task/:id',
        component: TaskComponent
    },{
        path: 'userTask/:id',
        component: UserViewComponent
    },{
        path: 'users/:id',
        component: UsersProjectComponent
    },
    //  {
    //      path: 'charts/:id',
    //      component: UserViewComponent
    // },
    {
        path: '**',
        redirectTo: ''
    }];


@NgModule({
    imports: [RouterModule.forRoot(routes,{
        useHash : true
    })],
    exports: [RouterModule]
})

export class AppRoutingModule { }
