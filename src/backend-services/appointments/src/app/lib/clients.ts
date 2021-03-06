import { AppointmentsClient } from '@packages/communication';

import { kafka } from './kafka';

export const appointmentsClient = new AppointmentsClient(kafka);
