
const headers = {
    /****** STANDARD **********
     * 
     * Use kebab-case (in lowercase) when naming custom headers.
     * Absolutely do not use snake_case because NGINX strips headers that contain '_' from requests
     * Do not prefix custom headers with 'X-'
     * 
    ***************************/

    'Content-Type': 'application/json',


    // we distinguish between normal browser requests and XHR requests in the backend using this flag (fetch-req)
    'fetch-req': true
}



export default {
    method: `POST`,
    redirect: `follow`,
    credentials: `same-origin`,
    headers
}