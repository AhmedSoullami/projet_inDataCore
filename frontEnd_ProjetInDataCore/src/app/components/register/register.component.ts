import { Component , OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/services/register.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  formRegister!: FormGroup;

  constructor(private router: Router, private FB: FormBuilder, private registerService: RegisterService) {}

  ngOnInit() {
    this.formRegister = this.FB.group({
      firstName: ['', Validators.required],
      lastName:['',Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
     password2: ['', Validators.required]
    });
  }

  OnLogin() {
    return this.router.navigateByUrl('/login');
  }
  onRegister() {
    if (this.formRegister.valid) {
      const firstName = this.formRegister.value.firstName;
      const lastName = this.formRegister.value.lastName;
      const email = this.formRegister.value.email;
      const password = this.formRegister.value.password;
      const password2=this.formRegister.value.password2
      if (password !== password2) {
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Les mots de passe ne correspondent pas.'
        });
        return;
      }

      this.registerService.register(firstName, lastName,email, password).subscribe({
        next: data => {
          
          console.log(data);
          Swal.fire('Bonjour ' + firstName + ', vous êtes maintenant membre inData Core.');
          this.router.navigateByUrl("/login")
        },
        error: err => {
          console.log(err);
        }
      });
    }
  }
}


