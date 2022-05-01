/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import VisiteUpdateComponent from '@/entities/visite/visite-update.vue';
import VisiteClass from '@/entities/visite/visite-update.component';
import VisiteService from '@/entities/visite/visite.service';

import RendezVousService from '@/entities/rendez-vous/rendez-vous.service';

import DetectionService from '@/entities/detection/detection.service';
import AlertService from '@/shared/alert/alert.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const store = config.initVueXStore(localVue);
const router = new Router();
localVue.use(Router);
localVue.use(ToastPlugin);
localVue.component('font-awesome-icon', {});
localVue.component('b-input-group', {});
localVue.component('b-input-group-prepend', {});
localVue.component('b-form-datepicker', {});
localVue.component('b-form-input', {});

describe('Component Tests', () => {
  describe('Visite Management Update Component', () => {
    let wrapper: Wrapper<VisiteClass>;
    let comp: VisiteClass;
    let visiteServiceStub: SinonStubbedInstance<VisiteService>;

    beforeEach(() => {
      visiteServiceStub = sinon.createStubInstance<VisiteService>(VisiteService);

      wrapper = shallowMount<VisiteClass>(VisiteUpdateComponent, {
        store,
        localVue,
        router,
        provide: {
          visiteService: () => visiteServiceStub,
          alertService: () => new AlertService(),

          rendezVousService: () =>
            sinon.createStubInstance<RendezVousService>(RendezVousService, {
              retrieve: sinon.stub().resolves({}),
            } as any),

          detectionService: () =>
            sinon.createStubInstance<DetectionService>(DetectionService, {
              retrieve: sinon.stub().resolves({}),
            } as any),
        },
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.visite = entity;
        visiteServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(visiteServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.visite = entity;
        visiteServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(visiteServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundVisite = { id: 123 };
        visiteServiceStub.find.resolves(foundVisite);
        visiteServiceStub.retrieve.resolves([foundVisite]);

        // WHEN
        comp.beforeRouteEnter({ params: { visiteId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.visite).toBe(foundVisite);
      });
    });

    describe('Previous state', () => {
      it('Should go previous state', async () => {
        comp.previousState();
        await comp.$nextTick();

        expect(comp.$router.currentRoute.fullPath).toContain('/');
      });
    });
  });
});
