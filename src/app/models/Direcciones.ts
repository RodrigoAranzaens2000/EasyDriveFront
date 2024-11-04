import { Escuelas } from "./Escuelas"
import { Usuarios } from "./Usuarios"

export class Direcciones {
    calle: string = ""
    ciudad: string = ""
    pais : string = ""
    latitud: number = 0
    estadProvincia: string = ""
    iddireccion: number = 0
    codigoPostal :number = 0
    longitud: number = 0
    esc: Escuelas=new Escuelas()
    user: Usuarios = new Usuarios()

}