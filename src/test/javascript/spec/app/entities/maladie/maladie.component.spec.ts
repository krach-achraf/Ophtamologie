/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import MaladieComponent from '@/entities/maladie/maladie.vue';
import MaladieClass from '@/entities/maladie/maladie.component';
import MaladieService from '@/entities/maladie/maladie.service';
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
  describe('Maladie Management Component', () => {
    let wrapper: Wrapper<MaladieClass>;
    let comp: MaladieClass;
    let maladieServiceStub: SinonStubbedInstance<MaladieService>;

    beforeEach(() => {
      maladieServiceStub = sinon.createStubInstance<MaladieService>(MaladieService);
      maladieServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<MaladieClass>(MaladieComponent, {
        store,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          maladieService: () => maladieServiceStub,
          alertService: () => new AlertService(),
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      maladieServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllMaladies();
      await comp.$nextTick();

      // THEN
      expect(maladieServiceStub.retrieve.called).toBeTruthy();
      expect(comp.maladies[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      maladieServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      expect(maladieServiceStub.retrieve.callCount).toEqual(1);

      comp.removeMaladie();
      await comp.$nextTick();

      // THEN
      expect(maladieServiceStub.delete.called).toBeTruthy();
      expect(maladieServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
