import axios from 'axios';
import GoogleSignin from './GoogleSignin';

const apiUrl = 'https://api-loja-do-sebastiao.herokuapp.com/';
let token = 'ya29.a0AfH6SMAfEqfom6584as5OaY8ChXN0rbbqv036oyzLE-yVB48jr3Ccux2JQI8Vn0QaKDLPoMWes4eZzMxNDRruHSOlET0J037vkNJIKcHfEkZM_3aKeOH4bIQdh8XfhqEPNzjc3SShSLIZLoycuSuvmTStLnH1eUYYsI';

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
        console.log(token);
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
