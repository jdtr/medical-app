import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { HospitalModel } from '../models/hospital.model';
import { map } from 'rxjs/operators';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class HospitalsService {

  public url = `${base_url}/hospitals`;

  constructor(  private _http: HttpClient ) { }

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

  loadHospitals() {
    return this._http.get(this.url, this.headers)
      .pipe(map((resp: { ok: boolean, hospitals: HospitalModel[] }) => resp.hospitals));
  }
  createHospital(name: string) {
    return this._http.post(this.url, { name }, this.headers);
  }
  updateHospital(id: string, name: string) {
    return this._http.put(`${ this.url }/${ id }`, { name }, this.headers);
  }
  deleteHospital(id: string) {
    return this._http.delete(`${ this.url }/${ id }`, this.headers);
  }
}
