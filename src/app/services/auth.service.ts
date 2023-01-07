import { Injectable } from '@angular/core';
import { JwtTokenService } from './jwt-token.service';
import { Observable } from 'rxjs';
import { LoginResponse } from '../../defs/loginResponse';
import { HttpClient } from '@angular/common/http';
@Injectable({
	providedIn: 'root',
})
export class AuthService {
	constructor(protected jwtTokenService: JwtTokenService, protected http: HttpClient) {}

	isAuthenticated(): Observable<boolean> {
		return this.jwtTokenService.isLoggedIn();
	}

	login(email: string, password: string): Observable<LoginResponse> {
		return this.http.post<LoginResponse>('users/signin', {
			email,
			password,
		});
	}

	logOut(): void {
		this.jwtTokenService.deleteToken();
	}
}

// https://dzone.com/articles/create-a-beautiful-login-form-with-angular-material
// https://blog.angular-university.io/angular-jwt-authentication/
