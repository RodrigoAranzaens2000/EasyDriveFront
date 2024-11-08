import { Reservas } from "./Reservas"

export class Pagos {
    idpago:number=0
    fechaPago:Date=new Date(Date.now())
    metodoPago:string=""
    res: Reservas= new Reservas()
}
