import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { TestComponent } from './home/test/test.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
	{
		path: '',
		component: HomeComponent,
	},
	{
		path: 'login',
		component: LoginComponent,
		canActivate: [LoginGuard],
	},
	{
		path: 'test',
		component: TestComponent,
		canActivate: [AuthGuard],
	},
	{
		path: '**',
		redirectTo: '',
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
