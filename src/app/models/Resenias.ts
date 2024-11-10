import { CentrosMedicos } from "./CentrosMedicos"
import { Escuelas } from "./Escuelas"
import { Usuarios } from "./Usuarios"

export class Resenias{
    user: Usuarios = new Usuarios()
    esc:Escuelas=new Escuelas()
    centros:CentrosMedicos=new CentrosMedicos()
    idresenia: number = 0
    fechaResenia: Date = new Date(Date.now())
    calificacion: number = 0
    comentario: string = ""
}