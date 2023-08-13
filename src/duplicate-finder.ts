// gain access to contents of folder
// access details of files e.g. size and type
// create copy of two files but change name
// see how you can compare the contents
// check if HEIC files work in the same way
// once all this is done, loop through all files

import * as dotenv from "dotenv";
dotenv.config();
import * as fs from "fs/promises";

const iCloudDir: string = process.env.ICLOUD_PATH ?? "";

export const findDuplicates = () => {
    if (!iCloudDir) {
        console.error("ERROR: ENVIRONMENT VARIABLES FAILED TO LOAD");
        return;
    }

    console.log("Loading iCloud files");
    return fs
        .readdir(iCloudDir)
        .then((contents: Array<string>) => {
            console.log("Local files loaded.");

            const fileStats = [];

            for (let fileName of contents) {
                const currentFile = fs.stat(`${iCloudDir}/${fileName}`);
                fileStats.push(currentFile);
            }

            return Promise.all(fileStats);
        })
        .then((fileStats) => {
            console.table(fileStats);
        });
};
