import axios from "axios";
import { toast } from "react-toastify";
import { router } from "../router/Routes";

const sleep = () => new Promise((resolve) => setTimeout(resolve, 1000));
axios.defaults.baseURL = "http://localhost:59346/api/";

axios.defaults.withCredentials = true;
const responseBody = (response) => response.data;
axios.interceptors.response.use(async response => {
    await sleep();
    return response;
  },
  (error) => {
    const { data, status } = error.response;
    switch (status) {
      case 400:
        toast.error(data.title);
        break;
      case 401:
        toast.error(data.title);
        break;
      case 403:
        toast.error(data.title);
        break;
      case 404:
        toast.error(data.title);
        break;
      case 500:
        router.navigate("/server-error", { state: { error: data } });
        break;

      default:
        break;
    }
    return Promise.reject(error.response);
  }
);
const requests = {
  get: (url) => axios.get(url).then(responseBody),
  post: (url, body) => axios.post(url, body).then(responseBody),
  put: (url, body) => axios.put(url, body).then(responseBody),
  delete: (url) => axios.delete(url).then(responseBody),
};
const Catalog = {
  list: () => requests.get("products"),
  details: (id) => requests.get(`products/${id}`),
};

const Basket = {
  get: () => requests.get("basket"),
  addItem: (productId, quantity = 1) => requests.post(`basket?productId=${productId}&quantity=${quantity}`, {}),
  removeItem: (productId, quantity) => requests.delete(`basket?productId=${productId}&quantity=${quantity}`)
}

const TestErrors = {
  get400Error: () => requests.get("buggy/bad-request"),
  get401Error: () => requests.get("buggy/unauthorised"),
  get403Error: () => requests.get("buggy/validation-error"),
  get404Error: () => requests.get("buggy/not-found"),
  get500Error: () => requests.get("buggy/server-error"),
};
const agent = {
  Catalog,
  TestErrors,
  Basket,
};
export default agent;
