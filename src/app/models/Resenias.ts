import { CentrosMedicos } from "./CentrosMedicos"
import { Escuelas } from "./Escuelas"

export class Resenias{
    fechaResenia: Date = new Date(Date.now())
    idresenia: number = 0
    comentario: string = ""
    calificacion: number = 0
    Escuelas:Escuelas=new Escuelas()
    CentrosMedicos:CentrosMedicos=new CentrosMedicos()
}
/* prueba */