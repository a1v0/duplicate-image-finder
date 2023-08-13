import { compareLocalWithICloud } from "./compare-local-with-icloud";

(() => {
    // the first two args are spoken for. [2] is the received from CLI
    const action = process.argv[2];

    if (action === "comp") {
        console.log("Running comparison between local and iCloud files.");
        compareLocalWithICloud();
        return;
    }

    if (action === "dupl") {
        console.log("Identifying duplicate files in iCloud directory.");
        return;
    }

    console.log("Please enter a valid script argument.");
})();
