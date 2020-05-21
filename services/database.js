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
    updateProduct: (id, product) => {
        return axios.put(`${apiUrl}${id}?token=${token}`, product);
    },
    deleteProduct: (id) => {
        return axios.delete(`${apiUrl}${id}?token=${token}`);
    },
    updateImage: (id, file) => {
        const formData = new FormData();

        const tokens = file.uri.split('/');
        const fileName = tokens[tokens.length-1]; // O último nome na uri

        formData.append('file', {
            name: fileName,
            type: 'image/jpeg',
            uri: Platform.OS === "android" ? file.uri : file.uri.replace("file://", "")
        });
        
        return axios.post(`${apiUrl}image/${id}?token=${token}`, formData);
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
