import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin!: FormGroup;

  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onLogin(): void {
    if (this.formLogin.valid){
      let email=this.formLogin.value.email;
      let password = this.formLogin.value.password;

      this.loginService.login(email, password).subscribe({
     next: data => {
      this.loginService.saveToken(data);
      this.loginService.getUserIdFromToken()
    console.log('Data:', data);
    this.router.navigateByUrl("/acceuil")
  },
  error: err => {
    console.error('Error:', err);
  }
});

        
      
}}
}
