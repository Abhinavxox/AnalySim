import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectCreateComponent } from './project-create/project-create.component';
import { ProjectHomeComponent } from './project-home/project-home.component';


const routes: Routes = [
    {path: '', component: ProjectCreateComponent},
    {path: 'create', component : ProjectCreateComponent},
    {path: ':username/:projectname', component : ProjectHomeComponent},
    {path: ':username/:projectname/files', component : ProjectHomeComponent},
    {path: ':username/:projectname/files/**', component : ProjectHomeComponent},
    {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
