// scripts/format-css.js
const fs = require("fs");
const glob = require("glob");
const beautify = require("js-beautify").css;
const pkg = require("../package.json");

const projectName = process.env.PROJECT_NAME || pkg.name;
const pattern = `public/assets/css/${projectName}.css`;

console.log(`▶︎ format-css: looking for files → ${pattern}`);

glob.sync(pattern).forEach(file => {
  console.log(`▶︎ format-css: formatting ${file}`);
  let content = fs.readFileSync(file, "utf8");
  content = beautify(content, {
    indent_size: 2,
    brace_style: "collapse",
    newline_between_rules: false,
    selector_separator_newline: false
  });
  // 빈 줄 제거
  const lines = content.split(/\r?\n/).filter(l => l.trim() !== "");
  content = lines.join("\n") + "\n";

  fs.writeFileSync(file, content, "utf8");
  console.log(`✔ formatted ${file}`);
});
