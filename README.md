[![Build Status](https://secure.travis-ci.org/nathan7/node-fsobj.png?branch=master)](https://travis-ci.org/nathan7/node-fsobj)

fsobj
=====
Have your filesystem hierarchy as an object hierarchy.
fsobj returns an object with getters that return file contents for files and fsobjs for directories.
Files are read as UTF-8, *synchronously*.
It can optionally strip file extensions.

fsobj(pathname, ext)
====================
pathname is the directory that is the root of the fsobj.
ext is an optional extension to strip from filenames.
