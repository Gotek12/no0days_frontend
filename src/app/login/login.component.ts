import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';
import { tap } from 'rxjs';

@Component({
	selector: 'nod-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
	loginForm: FormGroup;

	public loginInvalid: boolean;

	constructor(
		private formBuilder: FormBuilder,
		protected authService: AuthService,
		protected http: HttpClient,
		public router: Router,
		@Inject(DOCUMENT) private document: Document
	) {}

	ngOnInit(): void {
		this.loginForm = this.formBuilder.group({
			email: ['', Validators.email],
			password: ['', Validators.required],
		});
	}

	async onSubmit(): Promise<void> {
		if (this.loginForm.valid) {
			const email = this.loginForm.get('email')!.value;
			const password = this.loginForm.get('password')!.value;
			this.authService.login(email, password).subscribe(
				(data) => {
					this.authService.saveToken(data.token);
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
