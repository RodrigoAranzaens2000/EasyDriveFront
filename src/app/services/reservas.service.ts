import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { Reservas } from '../models/Reservas';
import { SumaDTO } from '../models/SumaDTO';
import { CantidadReservasEscuelasDTO } from '../models/CantidadReservasEscuelasDTO';
import { CantidadReservasCentros } from '../models/CantidadReservasCentros';
import { GananciasPromocionesDTO } from '../models/GananciasPromocionesDTO';
import { AnalisisServiciosDTO } from '../models/AnalisisServiciosDTO';

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

  insert(pr: Reservas) {
    return this.http.post(this.url, pr);
  }

  // Métodos para obtener los resultados de los queries
  getSumaServicios() {
    return this.http.get<SumaDTO[]>(`${this.url}/suma`);
  }
  
  getCantidadReservasPorEscuela() {
    return this.http.get<CantidadReservasEscuelasDTO[]>(`${this.url}/cantidad`);
  }

  getCantidadReservasPorCentro() {
    return this.http.get<CantidadReservasCentros[]>(`${this.url}/cantidadcentrosmedicos`);
  }

  getGananciaPromociones() {
    return this.http.get<GananciasPromocionesDTO[]>(`${this.url}/gananciaspromociones`);
  }

  getAnailisisServicios() {
    return this.http.get<AnalisisServiciosDTO[]>(`${this.url}/analisisservicios`);
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

  update(d: Reservas) {
    return this.http.put(this.url, d);
  }
}
