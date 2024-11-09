import { CentrosMedicos } from "./CentrosMedicos"
import { Escuelas } from "./Escuelas"
import { Promocion } from "./Promocion"
import { Servicios } from "./Servicios"
import { Usuarios } from "./Usuarios"

export class Reservas {
    idreserva:number=0
    estadoReserva:string=""
    fechaReserva:Date = new Date(Date.now())
    user:Usuarios=new Usuarios()
    esc:Escuelas=new Escuelas()
    centros:CentrosMedicos= new CentrosMedicos()
    ser:Servicios= new Servicios()
    prom:Promocion= new Promocion()
}