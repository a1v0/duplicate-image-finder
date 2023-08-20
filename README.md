# duplicate-image-finder

The script is accessible using command:

```sh
c; npm run build ; npm start <ARG>
```

The two available arguments are listed below.

## `dupl`

Goes through a folder of images and identifies size duplicates, even if the file name is different.

It writes its results to a CSV file. A separate Python script, `open-duplicate-files.py`, then opens each set of potentially identical files in turn, so that the user can delete or ignore as necessary.
