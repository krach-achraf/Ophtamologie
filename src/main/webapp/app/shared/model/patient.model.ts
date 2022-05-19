import { IUser } from '@/shared/model/user.model';
import { ISecretaire } from '@/shared/model/secretaire.model';
import { IMaladie } from '@/shared/model/maladie.model';
import { IDetection } from '@/shared/model/detection.model';
import { IRendezVous } from '@/shared/model/rendez-vous.model';

import { Genre } from '@/shared/model/enumerations/genre.model';
import {IStade} from "@/shared/model/stade.model";
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
  photoContentType?: string | null;
  photo?: string | null;
  user?: IUser | null;
  secretaire?: ISecretaire | null;
  stade?: IStade | null;
  detections?: IDetection[] | null;
  rendezVous?: IRendezVous[] | null;
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
    public photoContentType?: string | null,
    public photo?: string | null,
    public user?: IUser | null,
    public secretaire?: ISecretaire | null,
    public stade?: IStade | null,
    public detections?: IDetection[] | null,
    public rendezVous?: IRendezVous[] | null
  ) {}
}
