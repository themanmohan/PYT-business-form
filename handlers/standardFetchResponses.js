import showToast from './toastAlerts';
import { JSONResponseStatus } from '../util/verifications';


const standardFetchSuccessHandler = (res, toastConfig=null) => {
    const config = (toastConfig && (typeof toastConfig === `object`) && !Array.isArray(toastConfig)) ? toastConfig : {};


    if(res.data.redirect_uri){
        if(res.data.message){
            setTimeout(() => window.location.href = res.data.redirect_uri, 2500);


            if(!JSONResponseStatus(res.status).isSuccess){
                throw new Error(res.data.message);
            }
            else return showToast.success({
                ...config,
                message: res.data.message
            });
        }
        else{
            return window.location.href = res.data.redirect_uri;
        }
    }
    else if(res.data.message){
        if(!JSONResponseStatus(res.status).isSuccess){
            throw new Error(res.data.message);
        }
        else{
            return showToast.success({
                ...config,
                message: res.data.message
            });
        }
    }
}

const standardFetchErrorHandler = (err) => {
    return showToast.error({ message: err.message || `Internal Server Error` });
}


export default {
    success: standardFetchSuccessHandler,
    error: standardFetchErrorHandler
}