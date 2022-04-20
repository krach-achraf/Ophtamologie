/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import StadeComponent from '@/entities/stade/stade.vue';
import StadeClass from '@/entities/stade/stade.component';
import StadeService from '@/entities/stade/stade.service';
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
  describe('Stade Management Component', () => {
    let wrapper: Wrapper<StadeClass>;
    let comp: StadeClass;
    let stadeServiceStub: SinonStubbedInstance<StadeService>;

    beforeEach(() => {
      stadeServiceStub = sinon.createStubInstance<StadeService>(StadeService);
      stadeServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<StadeClass>(StadeComponent, {
        store,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          stadeService: () => stadeServiceStub,
          alertService: () => new AlertService(),
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      stadeServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllStades();
      await comp.$nextTick();

      // THEN
      expect(stadeServiceStub.retrieve.called).toBeTruthy();
      expect(comp.stades[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      stadeServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      expect(stadeServiceStub.retrieve.callCount).toEqual(1);

      comp.removeStade();
      await comp.$nextTick();

      // THEN
      expect(stadeServiceStub.delete.called).toBeTruthy();
      expect(stadeServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
