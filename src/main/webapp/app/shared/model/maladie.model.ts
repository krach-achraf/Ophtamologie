import { IDetection } from '@/shared/model/detection.model';
import { IPatient } from '@/shared/model/patient.model';
import { IStade } from '@/shared/model/stade.model';
import { IUnclassified } from '@/shared/model/unclassified.model';

export interface IMaladie {
  id?: number;
  code?: string | null;
  nom?: string | null;
  detection?: IDetection | null;
  patients?: IPatient[] | null;
  stades?: IStade[] | null;
  unclassifieds?: IUnclassified[] | null;
}

export class Maladie implements IMaladie {
  constructor(
    public id?: number,
    public code?: string | null,
    public nom?: string | null,
    public detection?: IDetection | null,
    public patients?: IPatient[] | null,
    public stades?: IStade[] | null,
    public unclassifieds?: IUnclassified[] | null
  ) {}
}
