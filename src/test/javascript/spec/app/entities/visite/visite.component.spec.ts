/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import VisiteComponent from '@/entities/visite/visite.vue';
import VisiteClass from '@/entities/visite/visite.component';
import VisiteService from '@/entities/visite/visite.service';
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
  describe('Visite Management Component', () => {
    let wrapper: Wrapper<VisiteClass>;
    let comp: VisiteClass;
    let visiteServiceStub: SinonStubbedInstance<VisiteService>;

    beforeEach(() => {
      visiteServiceStub = sinon.createStubInstance<VisiteService>(VisiteService);
      visiteServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<VisiteClass>(VisiteComponent, {
        store,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          visiteService: () => visiteServiceStub,
          alertService: () => new AlertService(),
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      visiteServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllVisites();
      await comp.$nextTick();

      // THEN
      expect(visiteServiceStub.retrieve.called).toBeTruthy();
      expect(comp.visites[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      visiteServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      expect(visiteServiceStub.retrieve.callCount).toEqual(1);

      comp.removeVisite();
      await comp.$nextTick();

      // THEN
      expect(visiteServiceStub.delete.called).toBeTruthy();
      expect(visiteServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
