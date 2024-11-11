import { AxiosError } from 'axios';
import { messages } from 'src/messages';

export const useErrorMessage = (error: Error) => {
  //handle axios error
  if (error instanceof AxiosError) {
    if (error.response && error.response.data.message) {
      return error.response.data.message;
    }
  }

  return messages[500];
};
