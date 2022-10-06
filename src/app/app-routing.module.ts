import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { UsersComponent } from './components/users/users.component';
import { UserResolver } from './services/user.resolver';

const routes: Routes = [
  { path: 'users', component: UsersComponent },
  { path: 'user/:uuid', component: UserDetailsComponent, resolve: { resolvedResponse: UserResolver} },
  { path: '**', redirectTo: 'users'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
