module.exports = (xss=null, req=null) => {
    // https://www.npmjs.com/package/xss
    
    if(xss && req && Object.keys(req).length){
        if(req.body && Object.keys(req.body).length){
            for(let key in req.body){
                req.body[key] = xss(req.body[key]);
            }
        }

        if(req.headers && Object.keys(req.headers).length){
            for(let key in req.headers){
                req.headers[key] = xss(req.headers[key]);
            }
        }

        if(req.query && Object.keys(req.query).length){
            for(let key in req.query){
                req.query[key] = xss(req.query[key]);
            }
        }
    }
}