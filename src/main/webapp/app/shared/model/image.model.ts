import { IStade } from '@/shared/model/stade.model';

export interface IImage {
  id?: number;
  code?: string | null;
  path?: string | null;
  stade?: IStade | null;
}

export class Image implements IImage {
  constructor(public id?: number, public code?: string | null, public path?: string | null, public stade?: IStade | null) {}
}
