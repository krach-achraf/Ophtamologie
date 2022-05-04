import { IMaladie } from '@/shared/model/maladie.model';
import { IClassification } from '@/shared/model/classification.model';
import { IImage } from '@/shared/model/image.model';

export interface IStade {
  id?: number;
  code?: string | null;
  level?: string | null;
  description?: string | null;
  maladie?: IMaladie | null;
  classifications?: IClassification[] | null;
  images?: IImage[] | null;
}

export class Stade implements IStade {
  constructor(
    public id?: number,
    public code?: string | null,
    public level?: string | null,
    public description?: string | null,
    public maladie?: IMaladie | null,
    public classifications?: IClassification[] | null,
    public images?: IImage[] | null
  ) {}
}
