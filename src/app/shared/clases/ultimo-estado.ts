import { Comision } from "../../core/interfaces/comisiones";




export function ultimoEstado(comision:Comision):any {
    return ultimoElement(comision.intermediate_comisiones).intermediate_estados.nombre

}

export function ultimaFecha(comision:Comision):any {
    return ultimoElement(comision.intermediate_comisiones).created_at

}

console.log("elemento"+ultimoElement)



export function ultimoElement(res:any[]):any{
    return res[res.length-1]
} 


