import { Kafka } from '@packages/communication';

import { config } from 'lib/config';

export const kafka = new Kafka(config.kafka);
