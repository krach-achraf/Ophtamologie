/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import SecretaireComponent from '@/entities/secretaire/secretaire.vue';
import SecretaireClass from '@/entities/secretaire/secretaire.component';
import SecretaireService from '@/entities/secretaire/secretaire.service';
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
  describe('Secretaire Management Component', () => {
    let wrapper: Wrapper<SecretaireClass>;
    let comp: SecretaireClass;
    let secretaireServiceStub: SinonStubbedInstance<SecretaireService>;

    beforeEach(() => {
      secretaireServiceStub = sinon.createStubInstance<SecretaireService>(SecretaireService);
      secretaireServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<SecretaireClass>(SecretaireComponent, {
        store,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          secretaireService: () => secretaireServiceStub,
          alertService: () => new AlertService(),
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      secretaireServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllSecretaires();
      await comp.$nextTick();

      // THEN
      expect(secretaireServiceStub.retrieve.called).toBeTruthy();
      expect(comp.secretaires[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      secretaireServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      expect(secretaireServiceStub.retrieve.callCount).toEqual(1);

      comp.removeSecretaire();
      await comp.$nextTick();

      // THEN
      expect(secretaireServiceStub.delete.called).toBeTruthy();
      expect(secretaireServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
