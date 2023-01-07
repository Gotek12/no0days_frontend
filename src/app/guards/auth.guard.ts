import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
	providedIn: 'root',
})
export class AuthGuard implements CanActivate {
	constructor(public authService: AuthService, public router: Router) {}

	async canActivate() {
		let canActivate = false;
		this.authService
			.isAuthenticated()
			.subscribe((logged) => {
				if (!logged) {
					this.router.navigate(['login']);
					canActivate = false;
				}
				canActivate = true;
			})
			.unsubscribe();
		return canActivate;
	}
}
