import PageComponent from 'components/Page/PageComponent.vue';
import PageHeader from 'components/Page/PageHeader.vue';
import PageBody from 'components/Page/PageBody.vue';
import PageBackButton from 'components/Page/PageBackButton.vue';

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    PageComponent: typeof PageComponent;
    PageHeader: typeof PageHeader;
    PageBody: typeof PageBody;
    PageBackButton: typeof PageBackButton;
  }
}
