import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Resenias } from '../models/Resenias';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class ReseniasService {

  private url = `${base_url}/resenias`;
  private listaCambio = new Subject<Resenias[]>();
  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Resenias[]>(this.url);
  }

  insert(re: Resenias) {
    return this.http.post(this.url, re);
  }

  //get y set
  getList() {
    return this.listaCambio.asObservable();
  }
  setList(listaNueva: Resenias[]) {
    this.listaCambio.next(listaNueva);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id: number) {
    return this.http.get<Resenias>(`${this.url}/${id}`);
  }

  update(d: Resenias) {
    return this.http.put(this.url, d);
  }
}
