module.exports = function(eleventyConfig) {
  return {
    dir: {
      input: "page",     // .njk 소스가 있는 폴더
      includes: "_includes",
      layouts: "_includes",
      output: "public",  // Eleventy가 HTML을 생성할 폴더
    },
    templateFormats: ["njk","html","md"]
  }
}
