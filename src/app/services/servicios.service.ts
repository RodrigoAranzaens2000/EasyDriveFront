import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Servicios } from '../models/Servicios';
import { Subject } from 'rxjs';
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  private url = `${base_url}/servicios`;
  private listaCambio = new Subject<Servicios[]>();

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Servicios[]>(this.url);
  }

  insert(de: Servicios) {
    return this.http.post(this.url, de);
  }

  //get y set
  getList() {
    return this.listaCambio.asObservable();
  }
  setList(listaNueva: Servicios[]) {
    this.listaCambio.next(listaNueva);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id: number) {
    return this.http.get<Servicios>(`${this.url}/${id}`);
  }

  update(d: Servicios) {
    return this.http.put(this.url, d);
  }
}


