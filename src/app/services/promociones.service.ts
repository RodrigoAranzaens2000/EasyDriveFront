import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Promocion } from '../models/Promocion';
import { Subject } from 'rxjs';

const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class PromocionesService {
  private url = `${base_url}/promociones`;
  private listaCambio = new Subject<Promocion[]>();
  constructor(private http: HttpClient) {}
  
  list() {
    return this.http.get<Promocion[]>(this.url);
  }

  insert(pr: Promocion) {
    return this.http.post(this.url, pr);
  }

  //get y set
  getList() {
    return this.listaCambio.asObservable();
  }
  setList(listaNueva: Promocion[]) {
    this.listaCambio.next(listaNueva);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id: number) {
    return this.http.get<Promocion>(`${this.url}/${id}`);
  }

  update(d: Promocion) {
    return this.http.put(this.url, d);
  }
}
