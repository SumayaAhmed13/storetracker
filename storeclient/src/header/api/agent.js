import axios from "axios";
import { toast } from "react-toastify";
import { router } from "../router/Routes";
import { PaginatedResponse } from "../model/pagination";



const sleep = () => new Promise((resolve) => setTimeout(resolve, 1000));
axios.defaults.baseURL = "http://localhost:59346/api/";

axios.defaults.withCredentials = true;
const responseBody = (response) => response.data;

axios.interceptors.request.use((config) => {
  const userJson = localStorage.getItem('user');
  const user = userJson && JSON.parse(userJson);
  if (user) config.headers.Authorization = `Bearer ${user.token}`;
  return config;
});

axios.interceptors.response.use(async response => {
   await sleep();
    const pagination=response.headers['pagination'];
    if(pagination){
      response.data=new PaginatedResponse(response.data,JSON.parse(pagination));
      console.log(response);
      return response;
    }
 
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
  get : (url, params) => axios.get(url, { params }).then(responseBody),
  post: (url, body) => axios.post(url, body).then(responseBody),
  put: (url, body) => axios.put(url, body).then(responseBody),
  delete: (url) => axios.delete(url).then(responseBody),
};
const Catalog = {
  list: (params) => requests.get("products",params),
  details: (id) => requests.get(`products/${id}`),
  fetchFilters:()=> requests.get("products/filters")
};

const Basket = {
  get: () => requests.get('basket'),
  addItem: (productId, quantity = 1) => requests.post(`basket?productId=${productId}&quantity=${quantity}`, {}),
  removeItem: (productId, quantity=1) => requests.delete(`basket?productId=${productId}&quantity=${quantity}`)
};
const Account = {
  login: (values) => requests.post('account/login', values),
  register: (values) => requests.post('account/register', values),
  currentUser: () => requests.get('account/currentUser'),
  fetchAddress: () => requests.get('account/savedAddress')
};
const Orders={
 list:()=>requests.get('orders'),
 fetch:(id)=>requests.get(`orders/${id}`),
 create:(values)=>requests.post('orders',values)
};
const Payments={
 createPaymentIntent:()=>requests.post("payments",{})
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
  Account,
  Orders,
  Payments
};
export default agent;
