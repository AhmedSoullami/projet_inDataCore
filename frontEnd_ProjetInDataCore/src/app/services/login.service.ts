import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  accessToken!:string

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string) {
    let options = {
      headers: new HttpHeaders()
        .set('Content-type', 'application/json')
        .set('Access-Control-Allow-Origin', 'http://localhost:4200'),
    };
    let data = {
      email: email,
      password: password
    };
    console.log(data)

    return this.http.post("http://localhost:8888/login", data, options);
  }
  getUserIdFromToken(): number | null {
    try {
      const decodedToken: any = jwtDecode(this.accessToken);
      if (decodedToken && decodedToken.sub) {
        const userId = decodedToken.sub.split(',')[0];
        console.log(userId)
        return userId;
      }
    } catch (error) {
      console.error('erreur decode token:', error);
    }
    return null;
  }
    getUserDetails(){
    
      return this.http.get(`http://localhost:8888/user-details/${this.getUserIdFromToken()}`)
    
    }
    saveToken(data: any) {
     
       return this.accessToken=data['accessToken'];
      
    }
    
isAuthenticated(): boolean {
  
  return !!this.accessToken;
}


}

