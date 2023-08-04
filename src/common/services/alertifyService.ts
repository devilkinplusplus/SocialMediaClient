import "alertifyjs/build/css/alertify.min.css";
import 'alertifyjs/build/css/themes/bootstrap.min.css';
import alertify from "alertifyjs";

export const showSuccess = (message: string) => {
  alertify.success(message, 5);
};

export const showError = (message: string) => {
  alertify.error(message, 5);
};

export const showWarning = (message: string) => {
  alertify.warning(message, 5);
};

export const confirmAlert = (
  title: string,
  message: string,
  onConfirm: () => void,
  onCancel?: () => void
) => {
  alertify.confirm(
    title,
    message,
    () => {
      if (typeof onConfirm === "function") {
        onConfirm();
      }
    },
    () => {
      if (typeof onCancel === "function") {
        onCancel();
      }
    }
  )
};

export default alertify;
