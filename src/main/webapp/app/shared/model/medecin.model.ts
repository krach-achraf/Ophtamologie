import { IUser } from '@/shared/model/user.model';
import { ISecretaire } from '@/shared/model/secretaire.model';
import { IRendezVous } from '@/shared/model/rendez-vous.model';
import { IClassification } from '@/shared/model/classification.model';

export interface IMedecin {
  id?: number;
  code?: string | null;
  nom?: string | null;
  numEmp?: string | null;
  prenom?: string | null;
  admin?: boolean | null;
  expertLevel?: number | null;
  photoContentType?: string | null;
  photo?: string | null;
  user?: IUser | null;
  secretaire?: ISecretaire | null;
  rendezVous?: IRendezVous[] | null;
  classifications?: IClassification[] | null;
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
    public photoContentType?: string | null,
    public photo?: string | null,
    public user?: IUser | null,
    public secretaire?: ISecretaire | null,
    public rendezVous?: IRendezVous[] | null,
    public classifications?: IClassification[] | null
  ) {
    this.admin = this.admin ?? false;
  }
}
