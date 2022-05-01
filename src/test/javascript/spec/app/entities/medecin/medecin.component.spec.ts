/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import MedecinComponent from '@/entities/medecin/medecin.vue';
import MedecinClass from '@/entities/medecin/medecin.component';
import MedecinService from '@/entities/medecin/medecin.service';
import AlertService from '@/shared/alert/alert.service';

const localVue = createLocalVue();
localVue.use(ToastPlugin);

config.initVueApp(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('b-badge', {});
localVue.directive('b-modal', {});
localVue.component('b-button', {});
localVue.component('router-link', {});

const bModalStub = {
  render: () => {},
  methods: {
    hide: () => {},
    show: () => {},
  },
};

describe('Component Tests', () => {
  describe('Medecin Management Component', () => {
    let wrapper: Wrapper<MedecinClass>;
    let comp: MedecinClass;
    let medecinServiceStub: SinonStubbedInstance<MedecinService>;

    beforeEach(() => {
      medecinServiceStub = sinon.createStubInstance<MedecinService>(MedecinService);
      medecinServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<MedecinClass>(MedecinComponent, {
        store,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          medecinService: () => medecinServiceStub,
          alertService: () => new AlertService(),
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      medecinServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllMedecins();
      await comp.$nextTick();

      // THEN
      expect(medecinServiceStub.retrieve.called).toBeTruthy();
      expect(comp.medecins[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      medecinServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      expect(medecinServiceStub.retrieve.callCount).toEqual(1);

      comp.removeMedecin();
      await comp.$nextTick();

      // THEN
      expect(medecinServiceStub.delete.called).toBeTruthy();
      expect(medecinServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
