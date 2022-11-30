import axios from 'axios';
import { useCreateNotification } from '../state/notification';

export const useCheckVersion = (isForced: boolean = false) => {
  const createNotification = useCreateNotification();
  return async () => {
    try {
      const res = await axios.get<string>(
        'https://raw.githubusercontent.com/GeorgeSG/flame/master/client/.env'
      );

      const githubVersion = res.data
        .split('\n')
        .map((pair) => pair.split('='))[0][1];

      if (githubVersion !== process.env.REACT_APP_VERSION) {
        createNotification({
          title: 'Info',
          message: 'New version is available!',
          url: 'https://github.com/GeorgeSG/flame/blob/master/CHANGELOG.md',
        });
      } else if (isForced) {
        createNotification({
          title: 'Info',
          message: 'You are using the latest version!',
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
};
