import { Kafka } from '@packages/communication';

import { config } from '@root/lib/config';

export const kafka = new Kafka({ ...config.kafka, mock: config.kafkaMock }, config.kafkaConsumer);
