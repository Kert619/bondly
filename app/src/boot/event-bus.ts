import { EventBus } from 'quasar';
import { boot } from 'quasar/wrappers';

export type EventBusType = {
  routeChanged: (path: string) => void;
};

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app }) => {
  const bus = new EventBus<EventBusType>();
  app.provide('bus', bus);
});