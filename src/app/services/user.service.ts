import { Response } from './../interfaces/response';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly apiBaseUrl = environment.BASE_URL;

  constructor(private http: HttpClient) { }

  //fetch all users
  getUsers(size: number = 10): Observable<Response> {
    return this.http.get<Response>(`${this.apiBaseUrl}/?results=${size}`).pipe(
      map(this.processResponse));
  }

  //fetch a single user by uuid
  getUser(uuid: string): Observable<any> {
    return this.http.get<any>(`${this.apiBaseUrl}/?uuid=${uuid}`).pipe(
      map(this.processResponse));
  }

  private processResponse(response: Response): Response {
    return{
      info: { ...response.info },
      results: response.results.map((user: any) => (<User>{
        uuid: user.login.uuid,
        firstName: user.name.first,
        lastName: user.name.last,
        email: user.email,
        username: user.login.username,
        gender: user.gender,
        address: `${user.location.street.number} ${user.location.street.name} ${user.location.city}, ${user.location.country}`,
        dateOfBirth: user.dob.date,
        phone: user.phone,
        imageUrl: user.picture.medium,
        coordinate: { latitude: +user.location.coordinates.latitude, longitude: +user.location.coordinates.latitude },
      }))
    }
  }

}
