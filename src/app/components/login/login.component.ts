import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',

  styleUrls: ['./login.component.css'],

})
export class LoginComponent implements OnInit{
  loginForm!: any;


  constructor(private formBuilder: FormBuilder , @Inject(LOCAL_STORAGE) private localStorage: StorageService , private authService: AuthService, private router : Router) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    const formData = this.localStorage.get('form-data');
    console.log(formData);
  }

  login(): void {

    if (this.loginForm.valid) {
      const email = this.loginForm.get('email').value;
      const password = this.loginForm.get('password').value;
      this.authService.validateLogin(email, password);
      // Handle registration logic here
    }
  this.router.navigate(['/home'])

  }


}
