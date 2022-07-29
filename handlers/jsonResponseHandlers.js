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