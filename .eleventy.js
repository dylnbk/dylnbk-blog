const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

const Image = require("@11ty/eleventy-img");

async function imageShortcode(cls, src, alt, sizes) {
  let metadata = await Image(src, {
    widths: [null, 600, 1024],
    formats: ["jpeg"],
    urlPath: "/media/uploads/",
    outputDir: "./_site/media/uploads/",
  });

  let imageAttributes = {
    class: cls,
    alt,
    sizes,
    loading: "lazy",
    decoding: "async",
  };

  return Image.generateHTML(metadata, imageAttributes, {
    whitespaceMode: "inline"
  });
}

module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("media");
    eleventyConfig.addPassthroughCopy("admin");
    eleventyConfig.addPassthroughCopy("css");
    eleventyConfig.addWatchTarget("css");
    eleventyConfig.addPassthroughCopy("fonts");
    eleventyConfig.addWatchTarget("fonts");
    eleventyConfig.addPlugin(syntaxHighlight);
    eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);

    const {
        DateTime
      } = require("luxon");
    
        eleventyConfig.addFilter('htmlDateString', (dateObj) => {
          return DateTime.fromJSDate(dateObj, {
            zone: 'utc'
          }).toFormat('yy-MM-dd');
        });
    
        eleventyConfig.addFilter("readableDate", dateObj => {
        return DateTime.fromJSDate(dateObj, {
          zone: 'utc'
        }).toFormat("dd-MM-yy");
      });
    
};