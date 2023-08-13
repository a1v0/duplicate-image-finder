import { compareLocalWithICloud } from "./compare-local-with-icloud";
import { findDuplicates } from "./duplicate-finder";

(() => {
    // the first two args are spoken for. [2] is the received from CLI
    const action = process.argv[2];

    if (action === "comp") {
        console.log("Running comparison between local and iCloud files.\n");
        compareLocalWithICloud();
        return;
    }

    if (action === "dupl") {
        console.log("Identifying duplicate files in iCloud directory.\n");
        findDuplicates();
        return;
    }

    console.log("Please enter a valid script argument.\n");
})();
