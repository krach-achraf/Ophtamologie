/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import DetectionComponent from '@/entities/detection/detection.vue';
import DetectionClass from '@/entities/detection/detection.component';
import DetectionService from '@/entities/detection/detection.service';
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
  describe('Detection Management Component', () => {
    let wrapper: Wrapper<DetectionClass>;
    let comp: DetectionClass;
    let detectionServiceStub: SinonStubbedInstance<DetectionService>;

    beforeEach(() => {
      detectionServiceStub = sinon.createStubInstance<DetectionService>(DetectionService);
      detectionServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<DetectionClass>(DetectionComponent, {
        store,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          detectionService: () => detectionServiceStub,
          alertService: () => new AlertService(),
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      detectionServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllDetections();
      await comp.$nextTick();

      // THEN
      expect(detectionServiceStub.retrieve.called).toBeTruthy();
      expect(comp.detections[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      detectionServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      expect(detectionServiceStub.retrieve.callCount).toEqual(1);

      comp.removeDetection();
      await comp.$nextTick();

      // THEN
      expect(detectionServiceStub.delete.called).toBeTruthy();
      expect(detectionServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
