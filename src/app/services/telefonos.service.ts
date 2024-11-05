import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { Telefonos } from '../models/Telefonos';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class TelefonosService {
  private url = `${base_url}/telefonos`;
  private listaCambio = new Subject<Telefonos[]>();
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Telefonos[]>(this.url);
  }

  insert(tel: Telefonos) {
    return this.http.post(this.url, tel);
  }

  //get y set
  getList() {
    return this.listaCambio.asObservable();
  }
  setList(listaNueva: Telefonos[]) {
    this.listaCambio.next(listaNueva);
  }


  listId(id: number) {
    return this.http.get<Telefonos>(`${this.url}/${id}`);
  }

  update(t: Telefonos) {
    return this.http.put(this.url, t);
  }
}
