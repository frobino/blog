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

_includes:
- layout in liquid format

_posts:
- posts in md format linking to the liquid layout
- posts.json: this file will apply the data inside to all of the files in our posts folder.  
  We could add this info in each post.md file in the --- header and remove the json file if preferred.

index.html:
- main (home) page: using liquid/md extra syntax

## References

A more advanced startup point should be: https://github.com/11ty/eleventy-base-blog.  
Note that the above project also shows how to auto deploy using Travis CI.