import axios from "axios";

const apiServices = {
  get: (url) => {
    return axios
      .get(url)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error.message));
  },
};

export default apiServices;
