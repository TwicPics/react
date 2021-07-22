const CssMinimizerPlugin = require( `css-minimizer-webpack-plugin` );
const path = require( `path` );
const MiniCssExtractPlugin = require( `mini-css-extract-plugin` );
const TerserPlugin = require( `terser-webpack-plugin` );

module.exports = {
    "mode": `production`,
    "entry": `./src/index.js`,
    "output": {
        "path": path.resolve( `dist` ),
        "filename": `twicpics.js`,
        "library": `@twicpics/react`,
        "libraryTarget": `umd`,
        "globalObject": `this`,
    },
    "plugins": [
        new MiniCssExtractPlugin( {
            "filename": `twicpics.css`,
        } ),
    ],
    "module": {
        "rules": [
            {
                "test": /\.js$/,
                "exclude": /node_modules/,
                "use": [ `babel-loader` ],
            },
            {
                "test": /\.css$/,
                "use": [
                    MiniCssExtractPlugin.loader,
                    {
                        "loader": `css-loader`,
                        "options": {
                            "modules": false,
                        },
                    },
                ],
            },
        ],
    },
    "optimization": {
        "minimize": true,
        "minimizer": [
            new TerserPlugin( {
                "parallel": true,
            } ),
            new CssMinimizerPlugin(),
        ],
    },
    "externals": {
        "react": `react`,
    },
};
