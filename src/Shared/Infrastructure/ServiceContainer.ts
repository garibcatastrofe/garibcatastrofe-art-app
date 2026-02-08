/* COMISIONS */
import { clsInsertComision } from "@/src/Comisions/Application/Services/clsInsertComision";
import { clsComisionRepository } from "@/src/Comisions/Infrastructure/clsComisionRepository";

const ComisionRepository = new clsComisionRepository();

export const ServiceContainer = {
  Comisions: {
    InsertComision: new clsInsertComision(ComisionRepository),
  },
};
