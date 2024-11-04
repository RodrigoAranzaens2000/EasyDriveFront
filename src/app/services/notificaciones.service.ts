import { Injectable } from '@angular/core';
import { Notificaciones } from '../models/Notificaciones';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {
  private url = `${base_url}/notificaciones`;
  private listaCambio = new Subject<Notificaciones[]>();
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Notificaciones[]>(this.url);
  }

  insert(not: Notificaciones) {
    return this.http.post(this.url, not);
  }

  //get y set
  getList() {
    return this.listaCambio.asObservable();
  }
  setList(listaNueva: Notificaciones[]) {
    this.listaCambio.next(listaNueva);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id: number) {
    return this.http.get<Notificaciones>(`${this.url}/${id}`);
  }

  update(n: Notificaciones) {
    return this.http.put(this.url, n);
  }
}
