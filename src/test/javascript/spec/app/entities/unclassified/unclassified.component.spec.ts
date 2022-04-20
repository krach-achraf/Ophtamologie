/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import UnclassifiedComponent from '@/entities/unclassified/unclassified.vue';
import UnclassifiedClass from '@/entities/unclassified/unclassified.component';
import UnclassifiedService from '@/entities/unclassified/unclassified.service';
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
  describe('Unclassified Management Component', () => {
    let wrapper: Wrapper<UnclassifiedClass>;
    let comp: UnclassifiedClass;
    let unclassifiedServiceStub: SinonStubbedInstance<UnclassifiedService>;

    beforeEach(() => {
      unclassifiedServiceStub = sinon.createStubInstance<UnclassifiedService>(UnclassifiedService);
      unclassifiedServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<UnclassifiedClass>(UnclassifiedComponent, {
        store,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          unclassifiedService: () => unclassifiedServiceStub,
          alertService: () => new AlertService(),
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      unclassifiedServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllUnclassifieds();
      await comp.$nextTick();

      // THEN
      expect(unclassifiedServiceStub.retrieve.called).toBeTruthy();
      expect(comp.unclassifieds[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      unclassifiedServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      expect(unclassifiedServiceStub.retrieve.callCount).toEqual(1);

      comp.removeUnclassified();
      await comp.$nextTick();

      // THEN
      expect(unclassifiedServiceStub.delete.called).toBeTruthy();
      expect(unclassifiedServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
