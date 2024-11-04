import { CentrosMedicos } from "./CentrosMedicos"
import { Escuelas } from "./Escuelas"
import { Usuarios } from "./Usuarios"

export class Telefonos {
    idtelefono: number= 0
    numeroTelefono: string = ""
    tipoDeTelefono: string = ""
    anexoEscuelas: string = ""
    user: Usuarios = new Usuarios()
    esc: Escuelas = new Escuelas()
    centros: CentrosMedicos = new CentrosMedicos()
}