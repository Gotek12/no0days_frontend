import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CanActivate, Router } from '@angular/router';
import { catchError, combineLatest, noop, Observable, of, switchMap } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class LoginGuard implements CanActivate {
	constructor(public authService: AuthService, public router: Router) {}
	canActivate(): Observable<boolean> {
		return this.authService.isAuthenticated().pipe(
			switchMap((logged) => {
				console.log(logged);
				if (logged) {
					this.router.navigate(['']).then(() => noop());
					return of(false);
				}
				return of(true);
			}),
			catchError(() => of(false))
		);
	}
}
