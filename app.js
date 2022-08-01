require(`dotenv`).config({ path: `process.env` });

// Packages
const express = require(`express`),
    app = express(),
    helmet = require(`helmet`),
    mongoose = require(`mongoose`),
    flash = require(`express-flash`),
    expressSession = require(`express-session`),
    MongoStore = require(`connect-mongo`);


// DB Setup 
const loadMongoose = require(`./config/mongoose`);
loadMongoose(mongoose);

require(`./model/businessForm`);
require(`./model/media`)(mongoose);

//view engine
app.use(flash());
app.set(`view engine`, `ejs`);

// App config

const loadHelmet = require(`./loaders/helmets`),
    loadExpressSession = require(`./loaders/expressSession`);

loadHelmet(app, helmet);
loadExpressSession(app, expressSession, MongoStore);

//serving static files
app.use(express.static('public'))

// body parser
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended: true,limit: '50mb'}));

// logging http activity
// if(process.env.MODE.toLowerCase() === `dev`){
//     app.use(require(`morgan`))
// }

//Routes
const routes = require(`./routes/_all`);
app.use(routes);

app.listen(process.env.PORT, () => console.log(`[ Business Form App ] running on ${ process.env.PORT }`));
