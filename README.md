# How to create a simple static webpage with 11ty

This simple tutorial has been inspired by:  
https://www.filamentgroup.com/lab/build-a-blog/  
https://keepinguptodate.com/pages/2019/06/creating-blog-with-eleventy/  
https://dev.to/omarhashimoto/create-a-blog-in-less-than-20-lines-of-code-using-11ty-3oh0  

The commit history shows how to setup a 11ty project and how to add pages in form of markdown.

## Steps

Install dependencies:

    npm install

Create the static content (default _site folder):

    npm run build

Host the static content:

    npm run serve

## Project structure

_11ty:
- js helpers

_data:
- metadata used by layouts, sitemap, etc.

_includes:
- layouts in njk format

posts:
- posts in md format linking to the liquid layout
- posts.json: this file will apply the data inside to all of the files in our posts folder.  
  We could add this info in each post.md file in the --- header and remove the json file if preferred.

css:
- makeup

index.njk:
- main (home) page: using njk extra syntax

archive.njk:
- archive page: using njk extra syntax

tags, tags-lisk.njk:
- tags pages: using njk extra syntax

sitemap.xml.njk:
- creates a sitemap in xml format
- sitemaps are needed to simplify life to search engines and make the blog more visible

## References

- A more advanced startup point should be: https://github.com/11ty/eleventy-base-blog.

## TODO

- Note that the above project also shows how to auto deploy using Travis CI.
- How to add dynamic support using Firebase: https://medium.com/pan-labs/dynamic-web-apps-on-github-pages-for-free-ffac2b776d45
- Search in site? https://www.raymondcamden.com/2019/10/20/adding-search-to-your-eleventy-static-site-with-lunr