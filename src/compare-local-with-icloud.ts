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
                    const [fileName, localFile, iCloudFile] = files;
                    if (localFile.size !== iCloudFile.size) {
                        return moveFile(fileName);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    });
};

const loadFiles = (fileName: string) => {
    const localFile = fs.stat(`${localDir}/${fileName}`);
    const iCloudFile = fs.stat(`${iCloudDir}/${fileName}`);
    return Promise.all([fileName, localFile, iCloudFile]);
};

const moveFile = (fileName: string) => {
    console.log(`File ${fileName} moved for renaming.`);

    return fs.rename(
        `${localDir}/${fileName}`,
        `${localDir}/rename/${fileName}`
    );
};
