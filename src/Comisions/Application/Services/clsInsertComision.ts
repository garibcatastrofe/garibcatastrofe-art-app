import { IComisionRepository } from "../../Domain/Interfaces/IComisionRepository";
import { IComisionCreateDto } from "../../Domain/Interfaces/IComisionCreateDto";
import { clsComisionFechaVencimiento } from "../../Domain/Entities/ValueObjects/clsComisionFechaVencimiento";
import { clsComision } from "../../Domain/Entities/Main/clsComision";
import { clsComisionTipo } from "../../Domain/Entities/ValueObjects/clsComisionTipo";
import { clsComisionDescripcion } from "../../Domain/Entities/ValueObjects/clsComisionDescripcion";
import { clsComisionReferencias } from "../../Domain/Entities/ValueObjects/ComisionReferencias/clsComisionReferencias";
import { clsUrlObject } from "../../Domain/Entities/ValueObjects/ComisionReferencias/clsUrlObject";
import { clsComisionMapper } from "../Mappers/clsComisionMapper";

export class clsInsertComision {
  public constructor(
    private readonly comisionRepository: IComisionRepository,
  ) {}

  public async InsertComisionAsync({
    tipo,
    descripcion,
    referencias,
    fecha_vencimiento,
  }: IComisionCreateDto): Promise<number> {
    console.log("Entrando al service de insert comision...");

    const referenciasVerificadas = referencias
      .map((r) => clsUrlObject.create(r.url))
      .filter((ref) => ref !== null);

    console.log("Pasó la verificación de referencias");

    const tipoVerificado = new clsComisionTipo(tipo);

    console.log("Pasó el tipo verificado");

    const newComision = new clsComision(
      tipoVerificado,
      new clsComisionDescripcion(descripcion),
      new clsComisionReferencias(referenciasVerificadas),
      new clsComisionFechaVencimiento(fecha_vencimiento),
    );

    const comisionId = await this.comisionRepository.InsertComisionAsync(
      clsComisionMapper.ToPrimitive(newComision),
    );

    return comisionId;
  }
}
