import { Reservas } from "./Reservas";

export class Calendario {
    idcalendario:number=0
    fechaSincronizacion:Date = new Date(Date.now())
    res:Reservas= new Reservas()
}