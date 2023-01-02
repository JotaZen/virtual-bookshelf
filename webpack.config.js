module.exports = function (webpackEnv) {
    return {
      resolve: {
        fallback: {
          "fs": false,
          "os": false,
          "path": require.resolve("path-browserify")
        }
      }
    }
  }