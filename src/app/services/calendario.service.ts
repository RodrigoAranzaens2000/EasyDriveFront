import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Calendario } from '../models/Calendario';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class CalendarioService {

  private url = `${base_url}/calendario`;
  private listaCambio = new Subject<Calendario[]>();

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Calendario[]>(this.url);
  }

  insert(ca: Calendario) {
    return this.http.post(this.url, ca);
  }

  //get y set
  getList() {
    return this.listaCambio.asObservable();
  }
  setList(listaNueva: Calendario[]) {
    this.listaCambio.next(listaNueva);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id: number) {
    return this.http.get<Calendario>(`${this.url}/${id}`);
  }

  update(c: Calendario) {
    return this.http.put(this.url, c);
  }
}
