const missingPackageLogger = require(`../handlers/missingPackageLogger`),
    { mongoURL, mainDbName } = require(`./mongodbConfig`);


module.exports = (mongoose) => {

    if(!mongoose) return missingPackageLogger(`mongoose`);

    mongoose.set(`runValidators`, true); // to run validate operators on update operations too

    const isDevMode = Boolean(process.env.MODE && (typeof process.env.MODE === `string`) && (process.env.MODE.toLowerCase().trim() === `dev`));

    const mongoURLToUse = isDevMode ? mongoURL.dev : mongoURL.prod,
        dbToUse = isDevMode ? mainDbName.dev : mainDbName.prod;

    mongoose.connect("mongodb://localhost/PYT-2019", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      
    })
    .then((data) => console.log(`[ ${ dbToUse } ] DB Connected`))
    .catch((err) => {
        console.log(err)
        console.log(`DB Not Connected`);
    });
}