import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment.prod';
import { Doctor } from '../models/doctor.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class DoctorsService {

  public url = `${base_url}/doctors`;

  constructor( private _http: HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    };
  }

  loadDoctors() {
    return this._http.get(this.url, this.headers)
      .pipe(map((resp: { ok: boolean, doctors: Doctor[] }) => resp.doctors));
  }
  loadDoctorById(id: string) {
    return this._http.get(`${this.url}/${id}`, this.headers)
      .pipe(map((resp: { ok: boolean, doctor: Doctor[] }) => resp.doctor));
  }
  createDoctor(doctor: { name: string, hospital: string }) {
    return this._http.post(this.url, doctor, this.headers);
  }
  updateDoctor(doctor: Doctor) {
    return this._http.put(`${ this.url }/${ doctor._id }`, doctor, this.headers);
  }
  deleteDoctor(id: string) {
    return this._http.delete(`${ this.url }/${ id }`, this.headers);
  }
}
