import { AppKoaState, AppKoaContext } from 'koa';
import Router from '@koa/router';

import { ServerConstants } from '@packages/common';

import { validateMiddleware } from 'middlewares';

import { createAppointmentValidator, updateAppointmentValidator, deleteAppointmentValidator } from './validators';
import { createAppointmentHandler, updateAppointmentHandler, deleteAppointmentHandler } from './handlers';

const appointmentsRouter = new Router<AppKoaState, AppKoaContext>();

const appointmentIdPlaceholder = ':appointmentId';

appointmentsRouter
  .post('/', validateMiddleware(createAppointmentValidator), createAppointmentHandler)
  .put(
    ServerConstants.appointmentPath(appointmentIdPlaceholder),
    validateMiddleware(updateAppointmentValidator),
    updateAppointmentHandler,
  )
  .delete(
    ServerConstants.appointmentPath(appointmentIdPlaceholder),
    validateMiddleware(deleteAppointmentValidator),
    deleteAppointmentHandler,
  );

export { appointmentsRouter };
