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
            const csvLines = [];
            for (let fileType in fileTree) {
                const files = fileTree[fileType];
                for (let fileSize in files) {
                    if (files[fileSize].length > 1) {
                        const csvLine = files[fileSize].join(",");
                        csvLines.push(csvLine);
                    }
                }
            }

            const csvData = csvLines.join("\n");
            console.log(`New duplicates found: ${csvData}`);

            return fs.appendFile(
                "duplicate-files.csv",
                `\n${csvData}`,
                "utf-8"
            );
        })
        .then(() => {
            console.log("Process completed successfully.");
            //
            //
            // at this point, get Node to open the files in a program window
            //
            //
            // https://stackabuse.com/executing-shell-commands-with-node-js/
            // this explains how the exec() method can run terminal commands for us
            //
            // once the CSV is written, open it up again and go through row by row
            // run the "open [FILENAME]" command for each item on each row
            // this should open up all images for the user to check
            // wait for the user to hit ENTER
            // once ENTER is pressed, append ", DONE" to the CSV row (or add it to the start)
            // - this might not be so easy, unless there's a method called updateFile or something
            // then go to the next line of the file
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
