import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IStade } from '@/shared/model/stade.model';

import StadeService from './stade.service';
import AlertService from '@/shared/alert/alert.service';
import ImageService from "@/entities/image/image.service";
import {IImage, Image} from "@/shared/model/image.model";
import {mixins} from "vue-class-component";
import JhiDataUtils from "@/shared/data/data-utils.service";

const validations: any = {
  image: {
    photo: {},
  },
};
@Component({
  mixins: [Vue2Filters.mixin],
  validations
})
export default class Stade extends mixins(JhiDataUtils) {
  @Inject('stadeService') private stadeService: () => StadeService;
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('imageService') private imageService: () => ImageService;

  private removeId: number = null;
  private image: IImage = new Image();
  public stades: IStade[] = [];
  public stade: IStade;

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllStades();
  }

  public clear(): void {
    this.retrieveAllStades();
  }

  public retrieveAllStades(): void {
    this.isFetching = true;
    this.stadeService()
      .retrieve()
      .then(
        res => {
          this.stades = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
          this.alertService().showHttpError(this, err.response);
        }
      );
  }

  public handleSyncList(): void {
    this.clear();
  }

  public prepareRemove(instance: IStade): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeStade(): void {
    this.stadeService()
      .delete(this.removeId)
      .then(() => {
        const message = 'A Stade is deleted with identifier ' + this.removeId;
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        this.retrieveAllStades();
        this.closeDialog();
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public prepareCeate(instance: IStade){
    this.stade = instance;
    if (<any>this.$refs.createEntity) {
      (<any>this.$refs.createEntity).show();
    }
  }

  public async saveImage(){
    this.image.stade = this.stade;
    try{
      await this.imageService().create(this.image);
      this.closeDialog();
      return this.$root.$bvToast.toast('An image is created', {
        toaster: 'b-toaster-top-center',
        title: 'Info',
        variant: 'info',
        solid: true,
        autoHideDelay: 5000,
      });
    }catch (e) {
      console.log(e);
    }

  }


  public clearInputImage(field, fieldContentType, idInput): void {
    if (this.image && field && fieldContentType) {
      if (Object.prototype.hasOwnProperty.call(this.image, field)) {
        this.image[field] = null;
      }
      if (Object.prototype.hasOwnProperty.call(this.image, fieldContentType)) {
        this.image[fieldContentType] = null;
      }
      if (idInput) {
        (<any>this).$refs[idInput] = null;
      }
    }
  }
  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
    (<any>this.$refs.createEntity).hide();
  }
}
