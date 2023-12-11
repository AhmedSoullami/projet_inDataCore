import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userDetails: any;

  constructor(private logservice: LoginService) {}

  ngOnInit(): void {
    if (this.logservice.isAuthenticated()) {
      this.logservice.getUserDetails().subscribe(
        (userInfo: any) => {
          this.userDetails = userInfo;
          console.log(this.userDetails);
        },
        (error) => {
          console.error('Error:', error);
        }
      );
    } else {
      console.log('User is not authenticated.');
    }
  }
}
