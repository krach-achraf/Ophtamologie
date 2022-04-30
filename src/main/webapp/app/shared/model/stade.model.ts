import { IMaladie } from '@/shared/model/maladie.model';
import { IImage } from '@/shared/model/image.model';

export interface IStade {
  id?: number;
  code?: string | null;
  level?: string | null;
  description?: string | null;
  maladie?: IMaladie | null;
  images?: IImage[] | null;
}

export class Stade implements IStade {
  constructor(
    public id?: number,
    public code?: string | null,
    public level?: string | null,
    public description?: string | null,
    public maladie?: IMaladie | null,
    public images?: IImage[] | null
  ) {}
}
