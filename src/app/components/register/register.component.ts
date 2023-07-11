import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as zxcvbn from 'zxcvbn';

// import zxcvbn from 'zxcvbn'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  passwordVisible = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.minLength(9), Validators.pattern('[0-9]+')]],
      password: ['', [Validators.required, Validators.minLength(9)]]
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
    if (this.registerForm.invalid) {
      return;
    }

  }
}
