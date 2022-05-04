import { IMaladie } from '@/shared/model/maladie.model';
import { IPatient } from '@/shared/model/patient.model';
import { IVisite } from '@/shared/model/visite.model';

export interface IDetection {
  id?: number;
  photoContentType?: string | null;
  photo?: string | null;
  code?: string | null;
  validation?: boolean | null;
  stade?: string | null;
  date?: Date | null;
  description?: string | null;
  maladie?: IMaladie | null;
  patient?: IPatient | null;
  visite?: IVisite | null;
}

export class Detection implements IDetection {
  constructor(
    public id?: number,
    public photoContentType?: string | null,
    public photo?: string | null,
    public code?: string | null,
    public validation?: boolean | null,
    public stade?: string | null,
    public date?: Date | null,
    public description?: string | null,
    public maladie?: IMaladie | null,
    public patient?: IPatient | null,
    public visite?: IVisite | null
  ) {
    this.validation = this.validation ?? false;
  }
}
