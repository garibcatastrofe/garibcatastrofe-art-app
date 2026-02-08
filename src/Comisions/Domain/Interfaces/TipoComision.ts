export const TIPO_COMISION = ["digital", "tradicional"] as const;

export type TipoComisionType = (typeof TIPO_COMISION)[number];
