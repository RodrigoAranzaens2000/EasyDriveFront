import { Injectable } from '@angular/core';
import { Pagos } from '../models/Pagos';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class PagosService {
  private url = `${base_url}/pagos`;
  private listaCambio = new Subject<Pagos[]>();

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Pagos[]>(this.url);
  }

  insert(pa: Pagos) {
    return this.http.post(this.url, pa);
  }

  //get y set
  getList() {
    return this.listaCambio.asObservable();
  }
  setList(listaNueva: Pagos[]) {
    this.listaCambio.next(listaNueva);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id: number) {
    return this.http.get<Pagos>(`${this.url}/${id}`);
  }

  update(d: Pagos) {
    return this.http.put(this.url, d);
  }
}
