import { ToastOptions, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastService = {
  success: (message:string, options?:ToastOptions<{}>) => {
    toast.success(message, {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 3000,
      ...options,
    });
  },
  error: (message:string, options?:ToastOptions<{}>) => {
    toast.error(message, {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 3000,
      ...options,
    });
  },
  warning: (message:string, options?:ToastOptions<{}>) => {
    toast.warning(message, {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 3000,
      ...options,
    });
  },
  info: (message:string, options?:ToastOptions<{}>) => {
    toast.info(message, {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 3000,
      ...options,
    });
  },
};

export default ToastService;