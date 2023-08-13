import * as dotenv from "dotenv";
dotenv.config();
import * as fs from "fs/promises";

export const compareLocalWithICloud = () => {
    // access both folders
    const localDir: string = process.env.LOCAL_PATH ?? "";
    fs.readdir(localDir).then((contents: Array<any>) => {
        console.dir(contents);
    });
    // loop through each file in local folder
    // if file has no extension OR if extension is TXT, then ignore
    // find file of same name in iCloud
    // compare size
    // if size is different, add file name to an array
    // at end, move all files in array to renaming folder
    // before renaming those files, better to do a manual check to see if it's working the way it should
    // before deleting files that aren't for renaming, best to check manually to see if it's working the way it should
};
