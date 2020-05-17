import axios from 'axios';

const apiUrl = 'https://api-loja-do-sebastiao.herokuapp.com/';
const token = 'ya29.a0AfH6SMBxsNfLcIORRZd2B5OOhdLaV7_fJWmlX8oDBffTsnjXiCCF68QSNRkSfCeg1jMy5fNvq1XMX5It5MkiJUYfUohCBBqJaMh83D1FYVof7NFxrbn7_jDNeFJ0S7pPyYTVXov-xEsq6n3BlMIQB41mODjXw_sydrI';

export default {

    getProducts: (category) => {
        return axios.get(`${apiUrl}${category}?token=${ token }`);
    }
}