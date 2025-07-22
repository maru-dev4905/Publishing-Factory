// .eleventy.js
const pkg = require("./package.json");

module.exports = function(eleventyConfig) {
  // 1) make PROJECT_NAME (or fallback pkg.name) available everywhere:
  eleventyConfig.addGlobalData(
      "projectName",
      process.env.PROJECT_NAME || pkg.name
  );

  // 2) your existing dir config
  return {
    dir: {
      input:    "page",
      includes: "_includes",
      layouts:  "_includes",
      data:     "_data",
      output:   "public",
    },
    templateFormats: ["njk","html","md"]
  };
};