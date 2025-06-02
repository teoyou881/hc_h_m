import axios from 'axios';

const VITE_ADMIN_TYPE_URL = import.meta.env.VITE_ADMIN_URL + '/options/type';

const optionTypeService = {
  getAllOptionTypes: () => {
    return axios.get(VITE_ADMIN_TYPE_URL);
  },
  getOptionTypeById: (id) => {
    return axios.get(`${VITE_ADMIN_TYPE_URL}/${id}`);
  },
  createOptionType: (optionTypeData) => {
    return axios.post(VITE_ADMIN_TYPE_URL, optionTypeData);
  },
  updateOptionType: (id, optionTypeData) => {
    return axios.put(`${VITE_ADMIN_TYPE_URL}/${id}`, optionTypeData);
  },
  deleteOptionType: (id) => {
    return axios.delete(`${VITE_ADMIN_TYPE_URL}/${id}`);
  },
};

export default optionTypeService;