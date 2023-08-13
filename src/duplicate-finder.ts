// gain access to contents of folder
// access details of files e.g. size and type
// create copy of two files but change name
// see how you can compare the contents
// check if HEIC files work in the same way
// once all this is done, loop through all files

import * as dotenv from "dotenv";
dotenv.config();
import * as fs from "fs/promises";
import { Stats } from "fs";

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
            fileStats.push(contents); // ensures we have a reference to all file names in the correct order. Not super elegant, but it avoids messing around with weird Promise logic

            return Promise.all(fileStats);
        })
        .then((fileStats) => {
            const fileNames: Array<string> | Stats | undefined =
                fileStats.pop();

            // this check is necessary because of TypeScript
            if (Array.isArray(fileStats) && Array.isArray(fileNames)) {
                return constructFileTree(fileStats, fileNames);
            } else {
                return Promise.reject("List of file names not found.");
            }
        })
        .then((fileTree) => {
            //
            //
            //
            // nested for loop to find any property with length > 1
            //
            // then run updateCSV method for each one
            //
            //
            //
            //
            //
            //
            //
        })
        .catch((error) => {
            console.error(error);
        });
};

const constructFileTree = (
    unfilteredFileStats: (string[] | Stats)[],
    fileNames: Array<string>
) => {
    const fileStats: Array<Stats> = [];
    unfilteredFileStats.forEach((unfilteredFileStat) => {
        if (unfilteredFileStat instanceof Stats) {
            fileStats.push(unfilteredFileStat);
        }
    });

    const fileTree: { [key: string]: { [key: string]: Array<string> } } = {};
    for (let i = 0; i < fileStats.length; ++i) {
        if (!fileStats[i].hasOwnProperty("size")) continue;

        const extensionRegex = /.\w+$/i;
        const extensionMatch = fileNames[i].match(extensionRegex);
        const extension = extensionMatch
            ? extensionMatch[0].toLowerCase()
            : "error";

        if (!fileTree.hasOwnProperty(extension)) {
            const emptyObject: { [key: string]: Array<string> } = {};
            fileTree[extension] = emptyObject;
        }

        const fileSize = String(fileStats[i].size);
        if (!fileTree[extension].hasOwnProperty(fileSize)) {
            fileTree[extension][fileSize] = [];
        }

        fileTree[extension][fileSize].push(fileNames[i]);
    }
    return fileTree;
};

const updateCSV = (fileNames: Array<string>) => {
    //
    //
    //
    // separate with commas and append to CSV
    //
    //
    //
    //
    //
    //
    //
};
