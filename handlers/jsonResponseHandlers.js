exports.sendSuccessJSONResponse = (res=null, data=null, httpStatusCode=null) => {
    
    if(res){
        let httpStatusCodeToUse = 200;
        if(httpStatusCode && Number(httpStatusCode)) httpStatusCodeToUse = Number(httpStatusCode);

        return res.status(httpStatusCodeToUse).json({
            status: `success`,
            data
        });
    }
}

exports.sendFailureJSONResponse = (res=null, data=null, httpStatusCode=200) => {
    performChecks(res, httpStatusCode);

    return res.status(Number(httpStatusCode)).json({
        status: `fail`,
        data
    });
}