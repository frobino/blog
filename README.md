# How to create a simple static webpage with 11ty

This simple tutorial has been inspired by [1], [2], [3]

[![Build Status](https://travis-ci.org/frobino/blog.svg?branch=master)](https://travis-ci.org/frobino/blog)

The commit history shows how to:
- setup a 11ty project
- add pages and blog posts in form of markdown
- embed JS script in blog posts using a Node JS module (e.g. ChartJS). See [7], [8]
- use w3 css with small custom adjustments (see w3-css branch)
- auto deploy using Travis CI

## Steps

Install dependencies:

    npm install

Create the static content (default _site folder):

    npm run build

Host the static content:

    npm run serve

NOTE: only md and njk are currenly used to generate static content. See package.json serve rule.

## Project structure

_11ty:
- js helpers for filters in .eleventy.js init file

_data:
- metadata used by layouts, sitemap, etc.

_includes:
- layouts in njk format

css:
- makeup

pages:
- contains extra pages
- about: a simple separate page using md syntax
- archive: a more complex separate page using njk extra syntax

posts:
- posts in md format linking to the njk layout
- posts.json: this file will apply the data inside to all of the files in our posts folder.  
  We could add this info in each post.md file in the --- header and remove the json file if preferred.

index.njk:
- main (home) page: using njk extra syntax

sitemap.xml.njk:
- creates a sitemap in xml format
- sitemaps are needed to simplify life to search engines and make the blog more visible

tags, tags-lisk.njk:
- tags pages: using njk extra syntax

## References

- A more advanced startup point should be: [eleventy-base-blog](https://github.com/11ty/eleventy-base-blog).

## TODO

- Add feeds (see metadata)
- New page showing how to add dynamic support using Firebase:
  - See [4]
- Search in site currently implemented with DuckDuckGo searchbox. Improve if needed:
  - See [5], [6]

[1]: https://www.filamentgroup.com/lab/build-a-blog/  
[2]: https://keepinguptodate.com/pages/2019/06/creating-blog-with-eleventy/  
[3]: https://dev.to/omarhashimoto/create-a-blog-in-less-than-20-lines-of-code-using-11ty-3oh0
[4]: https://medium.com/pan-labs/dynamic-web-apps-on-github-pages-for-free-ffac2b776d45
[5]: https://www.raymondcamden.com/2019/10/20/adding-search-to-your-eleventy-static-site-with-lunr
[6]: https://www.hawksworx.com/blog/adding-search-to-a-jamstack-site/
[7]: https://github.com/11ty/eleventy/issues/768
[8]: https://www.zachleat.com/web/eleventy-tutorial-level-2/