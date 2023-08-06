# duplicate-image-finder

Goes through a folder of images and identifies duplicates, even if the file name is different.

## Procedure

1. Loop through all files to construct an object, identifying file type and then size, e.g.:

```js
{
    gif: {
        "123": ["fileA.gif", "fileB.gif"]
    }
}
```

2. Run some sort of comparison test on files with the same type and size. If the test returns `true`, write the pair of file names into a CSV.
