import { IPatient } from '@/shared/model/patient.model';
import { IMedecin } from '@/shared/model/medecin.model';

export interface IRendezVous {
  id?: number;
  date?: Date | null;
  code?: string | null;
  status?: string | null;
  patient?: IPatient | null;
  medecin?: IMedecin | null;
}

export class RendezVous implements IRendezVous {
  constructor(
    public id?: number,
    public date?: Date | null,
    public code?: string | null,
    public status?: string | null,
    public patient?: IPatient | null,
    public medecin?: IMedecin | null
  ) {}
}
