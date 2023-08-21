# duplicate-image-finder

The script is accessible using command:

```sh
c; npm run build ; npm start <ARG>
```

The two available arguments are listed below.

## `dupl`

Goes through a folder of images and identifies size duplicates, even if the file name is different. It writes its results to a CSV file.

Once this is done, copy the contents of the CSV file into the `index.html` file and run that statically in a browser. It will display a row's worth of images at a time. If you spot any true duplicates, you must delete them manually.

## `comp`

Opens a local folder (specified in `.env` file) and loops through all files, checking whether a file of that name and size already exists in iCloud. Any that have the same name but _don't_ exist get moved to a folder called `rename`.
