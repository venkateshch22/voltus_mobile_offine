import {ToastAndroid} from 'react-native';

const toastMessage = text => {
  return ToastAndroid.showWithGravity(
    text,
    ToastAndroid.SHORT,
    ToastAndroid.CENTER,
  );
};

export default toastMessage