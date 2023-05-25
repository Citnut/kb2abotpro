import {readdirSync, lstatSync} from "node:fs"
import path from "node:path"
import { subname } from "./helpers/common.js"

async function gameLoader (dir) {
    let exportData = {}
    
}

export default async (dir) => {
    let exportData = {};
    const files = readdirSync(dir)
        .filter(
            filename =>
                lstatSync(path.join(dir, filename)).isDirectory() ||
                filename.split('.').pop() == 'js'
        );
    for (const filename of files) {
        try {
            let data = await import(path.join(dir, filename));
            if (data.default) data = data.default
            const sname = subname(filename) || filename;
            if (sname == 'common') {
                Object.assign(exportData, data);
            } else {
                exportData[sname] = data;
            }
        } catch (e) {
            console.error(e.stack);
            continue;
        }
    }
    return exportData;
};