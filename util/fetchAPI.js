const headers = {
    'Content-Type': 'application/json',

    /**
     * @definition A request is accepted as a Fetch API request only if it has this flag
     */
    'fetch-req': true
}

/**
 * Standard configuration object for Fetch API requests
 */
module.exports = {
    method: `POST`,
    redirect: `follow`,
    credentials: `same-origin`,
    headers
}