import { Usuarios } from "./Usuarios"

export class Notificaciones{
    idnotificacion: number = 0
    fechaNotificacion: Date = new Date(Date.now())
    mensaje: string = ""
    titulo: string = ""
    user: Usuarios = new Usuarios()

}