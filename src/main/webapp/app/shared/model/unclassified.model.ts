import { IMaladie } from '@/shared/model/maladie.model';
import { IClassification } from '@/shared/model/classification.model';

export interface IUnclassified {
  id?: number;
  code?: string | null;
  path?: string | null;
  maladie?: IMaladie | null;
  classifications?: IClassification[] | null;
}

export class Unclassified implements IUnclassified {
  constructor(
    public id?: number,
    public code?: string | null,
    public path?: string | null,
    public maladie?: IMaladie | null,
    public classifications?: IClassification[] | null
  ) {}
}
