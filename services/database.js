import axios from 'axios';
import GoogleSignin from './GoogleSignin';

const apiUrl = 'https://api-loja-do-sebastiao.herokuapp.com/';
let token = 'ya29.a0AfH6SMDo6uJcI_IVCwf-HW0ro6FOji4PxNkpaFOmlwnDGK1teZg9RW7YdaA9_SZQU9G3WBEXS9HjBQsClzEGRy6tBxCePCj7OMH1vA2AiTA2aFOj_mHLqYut8E26okRKDFHqXh10WWLwUMOHDtXOJqThPHAA_667Rt4';

export default {

    getProducts: (category) => {
        return axios.get(`${apiUrl}${category}?token=${token}`);
    },
    createProduct: (product) => {
        return axios.post(`${apiUrl}?token=${token}`, product);
    },
    updateProduct: (id, product) => {
        return axios.put(`${apiUrl}${id}?token=${token}`, product);
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
