import { Component, Vue, Inject } from 'vue-property-decorator';
import JhiDataUtils from '@/shared/data/data-utils.service';
import { IMaladie } from '@/shared/model/maladie.model';
import MaladieService from './maladie.service';
import AlertService from '@/shared/alert/alert.service';
import {IStade} from "@/shared/model/stade.model";
import {IImage, Image} from "@/shared/model/image.model";
import {mixins} from "vue-class-component";
import ImageService from "@/entities/image/image.service";

const validations: any = {
  image: {
    photo: {},
  },
};

@Component({
  validations,
})
export default class MaladieDetails extends mixins(JhiDataUtils)  {
  @Inject('maladieService') private maladieService: () => MaladieService;
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('imageService') private imageService: () => ImageService;

  private maladie: IMaladie = {};
  private stades: IStade[] = [];
  private stade: IStade;
  private image: IImage = new Image();

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.maladieId) {
        vm.retrieveMaladie(to.params.maladieId);
      }
    });
  }

  public retrieveMaladie(maladieId) {
    this.maladieService()
      .find(maladieId)
      .then(res => {
        this.maladie = res;
        this.stades = this.maladie.stades;
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
      (<any>this.$refs.createEntity).hide();
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
  public previousState() {
    this.$router.go(-1);
  }
}
