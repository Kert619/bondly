import { AxiosError } from 'axios';
import { Notify } from 'quasar';
import { messages } from 'src/messages';
import { Ref } from 'vue';

export const useHandleError = <T = unknown>(
  error: unknown,
  externalResults?: Ref<{ [K in keyof T]?: string[] }>
) => {
  if (
    error instanceof AxiosError &&
    error.status == 422 &&
    externalResults &&
    error.response?.data.errors
  ) {
    for (const [field, messages] of Object.entries(
      error.response.data.errors
    )) {
      externalResults.value[field as keyof T] = messages as string[];
    }
  } else if (error instanceof AxiosError && error.status == 429) {
    Notify.create({
      message: messages[429],
      type: 'negative',
      position: 'bottom',
      actions: [{ icon: 'close', color: 'white', round: true }],
    });
  } else {
    Notify.create({
      message: messages[500],
      type: 'negative',
      position: 'bottom',
      actions: [{ icon: 'close', color: 'white', round: true }],
    });
  }
};
