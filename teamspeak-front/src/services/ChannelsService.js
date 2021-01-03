import axios from 'axios';
import { config } from './ConfigService';
export default class ChannelsService{

    getChannels(){

    }

    getChannelById(){

    }

    getChannelsByCliId(cli_id){
        return axios.get( config.apiurl + '/channels/findbycliid/' + cli_id , config.axios);  
    }

    getChannelsBetween(){

    }

    updateChannelName(channel){
        return ( new Promise( resolve => {
            axios.put( config.apiurl + '/channels/updatechannelname', channel, config.axios )
                .then(resp => {
                    resolve(resp.data);                    
                })
                .catch(err => {
                    resolve({status:'ERROR', error: 'Ocurrió un error al conectar al servidor'});
                });
        }));
    }

    updateChannelPassword(channel){
        return ( new Promise( resolve => {
            axios.put( config.apiurl + '/channels/updatechannelpassword', channel, config.axios )
                .then(resp => {
                    resolve(resp.data);                    
                })
                .catch(err => {
                    resolve({status:'ERROR', error: 'Ocurrió un error al conectar al servidor'});
                });
        }));
    }

    createChannel(channel){
        return ( new Promise( resolve => {
            axios.post( config.apiurl + '/channels/create', channel, config.axios )
                .then(resp => {
                    resolve(resp.data);                    
                })
                .catch(err => {
                    resolve({status:'ERROR', error: err});
                });
        }));
    }

    deleteChannel(channel_id){
        return( new Promise( resolve => {
            axios.delete( config.apiurl + '/channels/delete/' + channel_id, config.axios)
                .then(resp => {
                    resolve(resp.data);                    
                })
                .catch(err => {
                    resolve({status:'ERROR', error: 'Ocurrió un error al conectar al servidor'});
                });
        }));
    }

}