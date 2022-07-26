require(`dotenv`).config({ path: `process.env` });

// Packages
const express = require(`express`),
    app = express(),
    helmet = require(`helmet`),
    mongoose = require(`mongoose`),
    expressSession = require(`express-session`),
    MongoStore = require(`connect-mongo`);


// DB Setup 
const loadMongoose = require(`./config/mongoose`);
loadMongoose(mongoose);



//view engine
app.set(`view engine`, `ejs`);

// App config

const loadHelmet = require(`./loaders/helmets`),
    loadExpressSession = require(`./loaders/expressSession`);

loadHelmet(app, helmet);
loadExpressSession(app, expressSession, MongoStore);

//serving static files
app.use(express.static('public'))

// body parser
app.use(express.urlencoded({extended:false}));
app.use(express.json())

// logging http activity
// if(process.env.MODE.toLowerCase() === `dev`){
//     app.use(require(`morgan`))
// }

//Routes
const routes = require(`./routes/_all`);
app.use(routes);

app.listen(process.env.PORT, () => console.log(`[ Business Form App ] running on ${ process.env.PORT }`));
