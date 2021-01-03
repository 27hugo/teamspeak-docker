import axios from 'axios';
import { config } from './ConfigService';
export default class LoginService{

    getProfile(steamID){
        return axios.get(config.apiurl + '/steamapi/getsteamprofile/' + steamID, config.axios);
    }

}