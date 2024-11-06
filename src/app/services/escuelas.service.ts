import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Escuelas } from '../models/Escuelas';
import { PromedioEscuelas } from '../models/PromedioEscuelas';

const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class EscuelasService {
  private url = `${base_url}/escuela`;
  private listaCambio = new Subject<Escuelas[]>();
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Escuelas[]>(this.url);
  }

  insert(de: Escuelas) {
    return this.http.post(this.url, de);
  }

    // Método para obtener los resultados de los queries
    getConsultasPromedio() {
      return this.http.get<PromedioEscuelas[]>(`${this.url}/calificacionpromedioporescuelas`); 
    }


  //get y set
  getList() {
    return this.listaCambio.asObservable();
  }
  setList(listaNueva: Escuelas[]) {
    this.listaCambio.next(listaNueva);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id: number) {
    return this.http.get<Escuelas>(`${this.url}/${id}`);
  }

  update(d: Escuelas) {
    return this.http.put(this.url, d);
  }
}
