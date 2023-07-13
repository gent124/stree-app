import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as zxcvbn from 'zxcvbn';
import {StorageService, LOCAL_STORAGE } from 'ngx-webstorage-service'
import { Router } from '@angular/router';
// import zxcvbn from 'zxcvbn'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  passwordVisible :boolean = false;
  confirmPasswordMatched :boolean = true;

  constructor(@Inject(LOCAL_STORAGE) private localStorage: StorageService, private formBuilder : FormBuilder, private router : Router ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.minLength(9), Validators.pattern('[0-9]+')]],
      password: ['', [Validators.required, Validators.minLength(9)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(9)]],
    });
  }

  getPasswordStrength(): number {
    const password = this.registerForm.get('password')?.value;
    const result = zxcvbn(password);
    return result.score; // Returns a score from 0 to 4 indicating the password strength
  }

  getPasswordStrengthColor(strength: number): string {
    return (strength <= this.getPasswordStrength() - 1) ? 'bg-pink' : '';
  }
  
  onRegisterSubmit(): void {

    this.onConfrimPasswordSubmit(); 
  
    if (this.registerForm.invalid || !this.confirmPasswordMatched) {
      return;
    }
      const existingUser = this.localStorage.get('form-data') || [];
      console.log(this.registerForm)
      const newUser = this.registerForm.value;

      existingUser.push(newUser);

      this.localStorage.set('form-data', existingUser);

    
    this.router.navigate(['/'])
  
    // Rest of your code for submitting the form
  }

  onConfrimPasswordSubmit(): void {
    const password = this.registerForm.get('password');
    const confirmPassword = this.registerForm.get('confirmPassword');
  
    if (password?.value !== confirmPassword?.value) {
      console.log('Passwords do not match');
      this.confirmPasswordMatched = false;
    } else {
      this.confirmPasswordMatched = true;
    }
  
    // Trigger validation check for confirmPassword control
    confirmPassword?.updateValueAndValidity();

    console.log(this.confirmPasswordMatched)
  }


}

