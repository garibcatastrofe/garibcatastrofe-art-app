import { IUrlObjectPrimitive } from "../Domain/Interfaces/IComisionPrimitive";
import { IComisionRepository } from "../Domain/Interfaces/IComisionRepository";

export class clsComisionRepository implements IComisionRepository {
  public async InsertComisionAsync(data: {
    tipo: string;
    descripcion: string;
    referencias: IUrlObjectPrimitive[];
    fecha_vencimiento?: Date;
  }): Promise<number> {
    // Simulación de proceso
    await new Promise((r) => setTimeout(r, 3000));

    console.log("Entrando al repositorio de insert comision...");
    console.log("data entrando: ", data);

    // Guardar en DB, enviar correo, etc
    return 123;
  }
}
