const missingPackageLogger = require(`../handlers/missingPackageLogger`),
    { mongoURL } = require(`../config/mongodbConfig`);

module.exports = (app=null, expressSession=null, MongoStore=null, daysToKeepSession=15) => {
    if(!(app && expressSession && MongoStore)) return missingPackageLogger(`express-session`);

    let ttlInDays = 15;
    if(daysToKeepSession && Number(daysToKeepSession) && Number(daysToKeepSession) > 0){
        ttlInDays = Number(daysToKeepSession);
    }

    const isDevMode = Boolean(process.env.MODE && (typeof process.env.MODE === `string`) && (process.env.MODE.toLowerCase().trim() === `dev`));
    const mongoURLToUse = isDevMode ? mongoURL.dev : mongoURL.prod;

    app.use(expressSession({
        secret: `2CpjBUcApaeMgKDkm8xK-T8SUbUjW3f3IEx5K571RTyuL-17Npr1QYVc5MF7dHsEH3`,
        saveUninitialized: false,
        resave: false,
        store: MongoStore.create({
            mongoUrl: mongoURLToUse,
            dbName: `pyt-bussion-form-session`,
            ttl: ttlInDays * 24 * 60 * 60 // days converted to seconds
        }),
        cookie: { maxAge: ttlInDays * 24 * 60 * 60 * 1000 } // days converted to milliseconds
    }));
}