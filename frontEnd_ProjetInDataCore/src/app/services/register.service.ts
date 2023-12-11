import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private httpC: HttpClient) { }

  register(firstName: string,lastName:string, email: string, password: string) {
    let options = {
      headers: new HttpHeaders({
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:4200"
      })
    };

    let data = {
      firstName: firstName,
      lastName:lastName,
      email: email,
      password: password
    };

    return this.httpC.post("http://localhost:8888/register", data, options);
  }
}
