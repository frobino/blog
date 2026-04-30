module.exports = async function(eleventyConfig) {
  const pluginNavigation = await import("@11ty/eleventy-navigation");
  const pluginSyntaxHighlight = await import("@11ty/eleventy-plugin-syntaxhighlight");

  eleventyConfig.addPlugin(pluginNavigation.default);
  eleventyConfig.addPlugin(pluginSyntaxHighlight.default);

  eleventyConfig.setDataDeepMerge(true);

  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return dateObj.toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" });
  });

  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    return dateObj.toISOString().split("T")[0];
  });

  eleventyConfig.addCollection("tagList", async function(collection) {
    let tagSet = new Set();
    for (const item of collection.getAll()) {
      if ("tags" in item.data) {
        for (const tag of item.data.tags) {
          if (!["all", "nav", "post", "posts"].includes(tag)) {
            tagSet.add(tag);
          }
        }
      }
    }
    return [...tagSet];
  });

  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("posts/**/*.js");
  eleventyConfig.addPassthroughCopy("posts/**/*.png");
  eleventyConfig.addPassthroughCopy("posts/5/**/*.wav");
  eleventyConfig.addPassthroughCopy("posts/5/**/*.ogg");
  eleventyConfig.addPassthroughCopy("posts/5/**/*.mp3");
  eleventyConfig.addPassthroughCopy("posts/5/**/*.json");
  eleventyConfig.addPassthroughCopy("posts/5/**/*.map");
  eleventyConfig.addPassthroughCopy("posts/5/**/*.html");
  eleventyConfig.addPassthroughCopy({
    "node_modules/chart.js/dist/Chart.min.css": "assets/Chart.min.css",
    "node_modules/chart.js/dist/Chart.min.js": "assets/Chart.min.js"
  });

  eleventyConfig.addFilter("head", (array, n) => {
    if (n < 0) return array.slice(n);
    return array.slice(0, n);
  });
};