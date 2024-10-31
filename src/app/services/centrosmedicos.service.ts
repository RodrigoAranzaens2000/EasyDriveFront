import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CentrosMedicos } from '../models/CentrosMedicos';
import { Subject } from 'rxjs';

const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class CentrosmedicosService {

  private url = `${base_url}/centros`;
  private listaCambio = new Subject<CentrosMedicos[]>();

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<CentrosMedicos[]>(this.url);
  }

  insert(de: CentrosMedicos) {
    return this.http.post(this.url, de);
  }

  //get y set
  getList() {
    return this.listaCambio.asObservable();
  }
  setList(listaNueva: CentrosMedicos[]) {
    this.listaCambio.next(listaNueva);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id: number) {
    return this.http.get<CentrosMedicos>(`${this.url}/${id}`);
  }

  update(d: CentrosMedicos) {
    return this.http.put(this.url, d);
  }
}


