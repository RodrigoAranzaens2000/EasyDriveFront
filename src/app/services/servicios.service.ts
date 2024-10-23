import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Servicios } from '../models/Servicios';
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  private url = `${base_url}/servicios`;

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Servicios[]>(this.url)
  }
}

