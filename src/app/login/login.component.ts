import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { JwtTokenService } from '../services/jwt-token.service';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';
import { tap } from 'rxjs';

// todo poprawić bo mi się nie podoba ten extend
@Component({
	selector: 'nod-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends AuthService implements OnInit {
	loginForm: FormGroup;

	public loginInvalid: boolean;

	constructor(
		private formBuilder: FormBuilder,
		protected override jwtTokenService: JwtTokenService,
		protected override http: HttpClient,
		public router: Router,
		@Inject(DOCUMENT) private document: Document
	) {
		super(jwtTokenService, http);
	}

	ngOnInit(): void {
		this.loginForm = this.formBuilder.group({
			email: ['', Validators.email],
			password: ['', Validators.required],
		});
	}

	async onSubmit() {
		if (this.loginForm.valid) {
			const email = this.loginForm.get('email')!.value;
			const password = this.loginForm.get('password')!.value;
			this.login(email, password).subscribe(
				(data) => {
					this.jwtTokenService.saveToken(data.token);
					this.router.navigate(['/']);
				},
				() => (this.loginInvalid = true)
			);
		}
	}

	initOauth() {
		this.http
			.get<any>('auth/init')
			.pipe(
				tap((data) => {
					this.document.location.href = data.redirect;
				})
			)
			.subscribe();
	}
}
