/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import ClassificationComponent from '@/entities/classification/classification.vue';
import ClassificationClass from '@/entities/classification/classification.component';
import ClassificationService from '@/entities/classification/classification.service';
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
  describe('Classification Management Component', () => {
    let wrapper: Wrapper<ClassificationClass>;
    let comp: ClassificationClass;
    let classificationServiceStub: SinonStubbedInstance<ClassificationService>;

    beforeEach(() => {
      classificationServiceStub = sinon.createStubInstance<ClassificationService>(ClassificationService);
      classificationServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<ClassificationClass>(ClassificationComponent, {
        store,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          classificationService: () => classificationServiceStub,
          alertService: () => new AlertService(),
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      classificationServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllClassifications();
      await comp.$nextTick();

      // THEN
      expect(classificationServiceStub.retrieve.called).toBeTruthy();
      expect(comp.classifications[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      classificationServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      expect(classificationServiceStub.retrieve.callCount).toEqual(1);

      comp.removeClassification();
      await comp.$nextTick();

      // THEN
      expect(classificationServiceStub.delete.called).toBeTruthy();
      expect(classificationServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
