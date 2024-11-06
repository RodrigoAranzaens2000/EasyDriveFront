import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { Reservas } from '../models/Reservas';

const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class ReservasService {

  private url = `${base_url}/reservas`;
  private listaCambio = new Subject<Reservas[]>();
  constructor(private http: HttpClient) { }
  list() {
    return this.http.get<Reservas[]>(this.url);
  }

  insert(re: Reservas) {
    return this.http.post(this.url, re);
  }

  //get y set
  getList() {
    return this.listaCambio.asObservable();
  }
  setList(listaNueva: Reservas[]) {
    this.listaCambio.next(listaNueva);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
  
  listId(id: number) {
    return this.http.get<Reservas>(`${this.url}/${id}`);
  }

  update(r: Reservas) {
    return this.http.put(this.url, r);
  }
}
