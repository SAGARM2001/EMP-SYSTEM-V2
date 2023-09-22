import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AuthGuard } from './guard/auth.guard';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'employee', loadChildren: () => import('./employee/empformmodule.module').then(p => p.EmployeeModule),canActivate: [AuthGuard] },
  {path: 'login', loadChildren: () => import('./login/loginmodule.module').then(l => l.LoginModule)},
  { path: 'welcome', component: WelcomeComponent , canActivate: [AuthGuard]},
  { path: 'home', component: HomeComponent },
  { path: '**', component: PagenotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
