import axios from 'axios';
import GoogleSignin from './GoogleSignin';

const apiUrl = 'https://api-loja-do-sebastiao.herokuapp.com/';
let token = '';

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
    }, 
    signIn: async () => {
        const resultToken = await GoogleSignin.signInWithGoogleAsync();

        token = resultToken;
        const { data } = await axios.post(`${apiUrl}auth`, { token });
        return data.accessPermission;
    },
    logOut: () => {
        axios.post(`${apiUrl}logout`, { token })
        .then(() => console.log('logout'))
        .catch(console.log)
        token = '';
    }
}
