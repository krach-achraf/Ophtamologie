import { IMaladie } from '@/shared/model/maladie.model';
import { IClassification } from '@/shared/model/classification.model';

export interface IUnclassified {
  id?: number;
  code?: string | null;
  photoContentType?: string | null;
  photo?: string | null;
  maladie?: IMaladie | null;
  classifications?: IClassification[] | null;
}

export class Unclassified implements IUnclassified {
  constructor(
    public id?: number,
    public code?: string | null,
    public photoContentType?: string | null,
    public photo?: string | null,
    public maladie?: IMaladie | null,
    public classifications?: IClassification[] | null
  ) {}
}
