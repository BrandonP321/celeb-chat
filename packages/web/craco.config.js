const CracoAlias = require("craco-alias");
const path = require("path");
const { getLoader, loaderByName } = require("@craco/craco");

// const absolutePath = path.join(__dirname, "../shared");

module.exports = {
    plugins: [
        {
            plugin: CracoAlias,
            options: {
                source: "tsconfig",
                baseUrl: "./src",
                tsConfigPath: "./tsconfig.json",
            }
        }
    ],
    webpack: {
        configure: (webpackConfig, { env, paths }) => {
            const { isFound, match } = getLoader(
                webpackConfig,
                loaderByName("babel-loader")
            );
            // if (isFound) {
            //     const include = Array.isArray(match.loader.include)
            //         ? match.loader.include
            //         : [match.loader.include];
            //     // match.loader.include = include.concat(absolutePath, schonComponents);
            //     match.loader.include = include.concat(absolutePath);
            // }
            return {
                ...webpackConfig,
                /**
             * Optionally, other webpack configuration details.
             */
                // optimization: {
                //   splitChunks: {
                //   },
                // },
            };
        }
    }
};