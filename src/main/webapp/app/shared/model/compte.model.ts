import { IUser } from '@/shared/model/user.model';

export interface ICompte {
  id?: number;
  email?: string | null;
  code?: string | null;
  motDePasse?: string | null;
  role?: string | null;
  ip?: string | null;
  status?: string | null;
  user?: IUser | null;
}

export class Compte implements ICompte {
  constructor(
    public id?: number,
    public email?: string | null,
    public code?: string | null,
    public motDePasse?: string | null,
    public role?: string | null,
    public ip?: string | null,
    public status?: string | null,
    public user?: IUser | null
  ) {}
}
