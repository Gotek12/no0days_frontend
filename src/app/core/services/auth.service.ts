import { Injectable } from '@angular/core';
import { JwtTokenService } from './jwt-token.service';
import { noop, Observable } from 'rxjs';
import { LoginResponse } from '../../../defs/login';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
	providedIn: 'root',
})
export class AuthService extends JwtTokenService {
	constructor(private http: HttpClient, private router: Router) {
		super();
	}

	login(email: string, password: string): Observable<LoginResponse> {
		return this.http.post<LoginResponse>('users/signin', {
			email,
			password,
		});
	}

	logOut(): void {
		this.deleteToken();
		this.router.navigate(['']).then(() => noop());
	}
}
