import { useToast } from "vue-toastification";

const toast = (type, text) => {
  if (type == "success") {
    return useToast().success(`${text}`, {
      position: "top-center",
      timeout: 1500,
      closeOnClick: true,
      pauseOnFocusLoss: true,
      pauseOnHover: true,
      hideProgressBar: true,
      closeButton: "button",
      icon: true,
    });
  } else if (type == "error") {
    return useToast().error(`${text}`, {
      position: "top-center",
      timeout: 3000,
      closeOnClick: true,
      pauseOnFocusLoss: true,
      pauseOnHover: true,
      hideProgressBar: true,
      closeButton: "button",
      icon: true,
    });
  } else if (type == "warning") {
    return useToast().warning(`${text}`, {
      position: "top-center",
      timeout: 1500,
      closeOnClick: true,
      pauseOnFocusLoss: true,
      pauseOnHover: true,
      hideProgressBar: true,
      closeButton: "button",
      icon: true,
    });
  }
};

export default toast;
