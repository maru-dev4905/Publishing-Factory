const pkg = require("./package.json");

module.exports = function(eleventyConfig) {
  // 1) PROJECT_NAME 전역 데이터로 추가
  eleventyConfig.addGlobalData(
      "projectName",
      process.env.PROJECT_NAME || pkg.name
  );

  // 2) 디렉터리 설정
  return {
    dir: {
      input:    "page",
      includes: "_includes",
      layouts:  "_includes",
      data:     "_data",
      output:   "public",
    },
    templateFormats: ["njk", "html", "md"]
  };
};