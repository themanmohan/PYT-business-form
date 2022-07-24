const missingPackageLogger = require(`../handlers/missingPackageLogger`);

module.exports = (app=null, helmet=null) => {
    
    if(helmet && app){
        app.use(helmet.dnsPrefetchControl());
        app.use(helmet.frameguard({action: `sameorigin` }));
        app.use(helmet.ieNoOpen());
        app.use(helmet.hidePoweredBy({setTo: 'PHP/7.1.31' })); // showing false value
        app.use(helmet.noSniff());
        app.use(helmet.permittedCrossDomainPolicies());
        app.use(helmet.referrerPolicy({policy: `no-referrer-when-downgrade` }));
        app.use(helmet.xssFilter());
    }
    else{
        missingPackageLogger(`helmet`);
    }
}