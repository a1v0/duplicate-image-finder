import * as dotenv from "dotenv";
dotenv.config();
import * as fs from "fs/promises";

const localDir: string = process.env.LOCAL_PATH ?? "";
const iCloudDir: string = process.env.ICLOUD_PATH ?? "";

export const compareLocalWithICloud = () => {
    if (!iCloudDir || !localDir) {
        console.error("ERROR: ENVIRONMENT VARIABLES FAILED TO LOAD");
        return;
    }

    console.log("Loading local files.");
    return fs.readdir(localDir).then((contents: Array<string>) => {
        console.log("Local files loaded.");

        for (let fileName of contents) {
            if (
                !fileName.includes(".") ||
                fileName.endsWith(".txt") ||
                fileName.endsWith(".TXT")
            ) {
                continue;
            }

            loadFiles(fileName)
                .then((files) => {
                    const [localFile, iCloudFile] = files;
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    });

    // loop through each file in local folder
    // if file has no extension OR if extension is TXT, then ignore
    // find file of same name in iCloud
    // compare size
    // if size is different, add file name to an array
    // at end, move all files in array to renaming folder
    // check folder exists before moving. Ensure it doesn't auto-create a folder
    // before renaming those files, better to do a manual check to see if it's working the way it should
    // before deleting files that aren't for renaming, best to check manually to see if it's working the way it should
};

const loadFiles = (fileName: string) => {
    console.log("Running comparison on " + fileName);
    const localFile = fs.stat(`${localDir}/${fileName}`);
    const iCloudFile = fs.stat(`${iCloudDir}/${fileName}`);
    return Promise.all([localFile, iCloudFile]);
};

const moveFile = () => {};
