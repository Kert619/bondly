import { boot } from 'quasar/wrappers';
import PageComponent from 'components/Page/PageComponent.vue';
import PageHeader from 'components/Page/PageHeader.vue';
import PageBody from 'components/Page/PageBody.vue';

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app }) => {
  app.component('page-component', PageComponent);
  app.component('page-header', PageHeader);
  app.component('page-body', PageBody);
});
