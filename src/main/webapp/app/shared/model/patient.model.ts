import { ICompte } from '@/shared/model/compte.model';
import { ISecretaire } from '@/shared/model/secretaire.model';
import { IMaladie } from '@/shared/model/maladie.model';
import { IDetection } from '@/shared/model/detection.model';

import { Genre } from '@/shared/model/enumerations/genre.model';
export interface IPatient {
  id?: number;
  code?: string | null;
  nom?: string | null;
  prenom?: string | null;
  dateNaissance?: Date | null;
  adresse?: string | null;
  genre?: Genre | null;
  telephone?: string | null;
  poids?: number | null;
  taille?: number | null;
  compte?: ICompte | null;
  secretaire?: ISecretaire | null;
  maladie?: IMaladie | null;
  detections?: IDetection[] | null;
}

export class Patient implements IPatient {
  constructor(
    public id?: number,
    public code?: string | null,
    public nom?: string | null,
    public prenom?: string | null,
    public dateNaissance?: Date | null,
    public adresse?: string | null,
    public genre?: Genre | null,
    public telephone?: string | null,
    public poids?: number | null,
    public taille?: number | null,
    public compte?: ICompte | null,
    public secretaire?: ISecretaire | null,
    public maladie?: IMaladie | null,
    public detections?: IDetection[] | null
  ) {}
}
