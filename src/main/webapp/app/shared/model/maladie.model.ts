import { IDetection } from '@/shared/model/detection.model';
import { IPatient } from '@/shared/model/patient.model';
import { IStade } from '@/shared/model/stade.model';

export interface IMaladie {
  id?: number;
  code?: string | null;
  nom?: string | null;
  description?: string | null;
  detection?: IDetection | null;
  patients?: IPatient[] | null;
  stades?: IStade[] | null;
}

export class Maladie implements IMaladie {
  constructor(
    public id?: number,
    public code?: string | null,
    public nom?: string | null,
    public description?: string | null,
    public detection?: IDetection | null,
    public patients?: IPatient[] | null,
    public stades?: IStade[] | null
  ) {}
}
