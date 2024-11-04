import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Direcciones } from '../models/Direcciones';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base;


@Injectable({
  providedIn: 'root'
})
export class DireccionesService {
  private url = `${base_url}/direcciones`;
  private listaCambio = new Subject<Direcciones[]>();
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Direcciones[]>(this.url);
  }

  insert(dir: Direcciones) {
    return this.http.post(this.url, dir);
  }

  //get y set
  getList() {
    return this.listaCambio.asObservable();
  }
  setList(listaNueva: Direcciones[]) {
    this.listaCambio.next(listaNueva);
  }

  listId(id: number) {
    return this.http.get<Direcciones>(`${this.url}/${id}`);
  }

  update(d: Direcciones) {
    return this.http.put(this.url, d);
  }
}

