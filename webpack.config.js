require(`dotenv`).config({ path: `./process.env` });

const path = require(`path`),
    entryDependancies = [ require.resolve(`core-js/stable`), require.resolve(`regenerator-runtime/runtime`) ];

const configObj = {
    entry: {
    
        'business-form': [ ...entryDependancies, `./src/businessForm.js` ],
  
    },
    output: {
        filename: `[name]-bundle.js`,
        path: path.resolve(__dirname, `public/scripts`)
    },
    module: {
        rules: [{
            test: /\.js$/,
            type: 'javascript/auto',
            exclude: /node_modules/,
            use: {
                loader: require.resolve(`babel-loader`),
                options: {
                    plugins: [require.resolve(`@babel/plugin-proposal-object-rest-spread`)]
                }
            }
        }]
    }
}


if(process.env.MODE === `dev`) configObj.devtool = 'source-map';


module.exports = configObj;