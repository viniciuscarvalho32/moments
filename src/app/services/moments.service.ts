import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Moment } from '../Moment';
import { Response } from '../Response';

@Injectable({
  providedIn: 'root'
})
export class MomentsService {

  private baseApiUrl = environment.baseApiUrl
  private apiUrl = `${this.baseApiUrl}/api/moments`

  constructor(private http: HttpClient) {

  }
  createMoment(formData: FormData): Observable<FormData> {
    return this.http.post<FormData>(this.apiUrl, formData)
  }

  getMoment(id: number): Observable<Response<Moment>> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Response<Moment>>(url)
  }

  getMoments(): Observable<Response<Moment[]>> {
    return this.http.get<Response<Moment[]>>(this.apiUrl)
  }

  removeMoments(id: Number) {
    return this.http.delete(`${this.apiUrl}/${id}`)
  }

  updateMoment(id: number, formData: FormData): Observable<FormData> {
    const url = `${this.apiUrl}/${id}`
    return this.http.put<FormData>(url, formData)
  }

}
