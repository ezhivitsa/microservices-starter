import { AppointmentsClient, Version } from '@packages/communication';

import { kafka } from './kafka';

export const appointmentsClient = new AppointmentsClient(kafka, { version: Version.v1 });
