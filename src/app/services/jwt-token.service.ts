import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class JwtTokenService {
	private jwtSub = new BehaviorSubject<boolean>(false);

	private TOKEN_NAME = 'token';
	constructor() {}

	isLoggedIn(): Observable<boolean> {
		this.isExpired();
		return this.jwtSub.asObservable();
	}

	getToken(): string {
		return localStorage.getItem(this.TOKEN_NAME) as string;
	}

	saveToken(token: string): void {
		localStorage.setItem(this.TOKEN_NAME, token);
		this.jwtSub.next(true);
	}

	deleteToken(): void {
		console.log('remove');
		localStorage.removeItem(this.TOKEN_NAME);
		this.jwtSub.next(false);
	}

	getEmail(): string {
		return this.getUser().email;
	}

	getUserName(): string {
		return this.getUser().name;
	}

	isExpired(): void {
		const token = this.getToken();
		if (!token) {
			this.jwtSub.next(false);
			return;
		}
		const expiry = JSON.parse(atob(token.split('.')[1])).exp;
		this.jwtSub.next(expiry * 1000 > Date.now());
	}

	getUser(): User {
		const token = this.getToken();
		const data = JSON.parse(atob(token.split('.')[1]));
		if (data.iss) {
			return { name: decodeURIComponent(escape(data.name)), email: data.email, provider: 'GOOGLE' };
		}
		return data.user;
	}
}

// https://blog.angular-university.io/angular-jwt-authentication/
// https://www.bezkoder.com/logout-when-token-expired-angular-14/

interface User {
	email: string;
	name: string;

	provider?: string;
}
