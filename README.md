# duplicate-image-finder

The script is accessible using command:

```sh
c; npm run build ; npm start <ARG>
```

The two available arguments are listed below.

## `dupl`

Goes through a folder of images and identifies size duplicates, even if the file name is different.

It writes its results to a CSV file. A separate Python script, `open-duplicate-files.py`, then opens each set of potentially identical files in turn, so that the user can delete or ignore as necessary.

## `comp`

Opens a local folder (specified in `.env` file) and loops through all files, checking whether a file of that name and size already exists in iCloud. Any that have the same name but _don't_ exist get moved to a folder called `rename`.
