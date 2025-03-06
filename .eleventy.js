module.exports = function (eleventyConfig) {
  // assets 폴더 복사 (이미지, js, css 등)
  eleventyConfig.addPassthroughCopy("assets");

  return {
    dir: {
      input: ".",          // 프로젝트 루트 전체를 입력으로 사용
      includes: "_includes",  // partial은 _includes 폴더에 둔다.
      data: "_data",          // _data 폴더는 프로젝트 루트에 있어야 함
      output: "dist"
    },
    templateFormats: ["njk", "html"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",

  };
};
