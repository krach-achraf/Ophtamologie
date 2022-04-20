import { ICompte } from '@/shared/model/compte.model';
import { ISecretaire } from '@/shared/model/secretaire.model';

export interface IMedecin {
  id?: number;
  code?: string | null;
  nom?: string | null;
  numEmp?: string | null;
  prenom?: string | null;
  admin?: boolean | null;
  expertLevel?: number | null;
  compte?: ICompte | null;
  secretaire?: ISecretaire | null;
}

export class Medecin implements IMedecin {
  constructor(
    public id?: number,
    public code?: string | null,
    public nom?: string | null,
    public numEmp?: string | null,
    public prenom?: string | null,
    public admin?: boolean | null,
    public expertLevel?: number | null,
    public compte?: ICompte | null,
    public secretaire?: ISecretaire | null
  ) {
    this.admin = this.admin ?? false;
  }
}
