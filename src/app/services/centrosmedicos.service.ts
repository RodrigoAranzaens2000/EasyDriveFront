import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CentrosMedicos } from '../models/CentrosMedicos';

const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class CentrosmedicosService {

  private url = `${base_url}/centros`;

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<CentrosMedicos[]>(this.url)
  }
}
