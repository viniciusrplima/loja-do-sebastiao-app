import axios from 'axios';

const apiUrl = 'https://api-loja-do-sebastiao.herokuapp.com/';
const token = 'ya29.a0AfH6SMCwizdv5MEokaqpW7ngP6JOTM9jtjWd61k98nl7h7G6CSdmfAVjdj02TaatCd4kWv-EnuaUOp8W9cfaqLAuUrWdUvixBFt8rmF_Ca-i_zLWeG50V-Ry_VeGK7jDcw5IVhXsaHtB_XiNQaW3eDzHYmYal-wK5_M';

export default {

    getProducts: (category) => {
        return axios.get(`${apiUrl}${category}?token=${token}`);
    },
    createProduct: (product) => {
        return axios.post(`${apiUrl}?token=${token}`, product);
    },
    updateProduct: (product) => {
        return axios.put(`${apiUrl}?token=${token}`, product);
    },
    deleteProduct: (id) => {
        return axios.delete(`${apiUrl}${id}?token=${token}`);
    },
    updateImage: (id, file) => {
        return axios.post(`${apiUrl}${id}?token=${token}`, file);
    }
}