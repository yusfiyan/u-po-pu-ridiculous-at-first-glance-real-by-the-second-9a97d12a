import * as fs from "node:fs";
import * as path from "node:path";

// Ridiculous at First Glance, Real by the Second
// (u-po-pu-ridiculous-at-first-glance-real-by-the-second-9a97d12a)
//
// One sentence, at most 200 characters, pitching a bizarre startup idea
// that sounds like a joke until the business logic lands: we sell bottled
// silence. The buyer is named (open-plan offices), the product is concrete
// (the silence of empty chapels), and the turn takes the reader from
// laughing to nodding — workers pay to hear nothing, and nothing is the
// cheapest thing there is to record.
const ENTRY =
  "We bottle the silence of empty chapels and sell it to open-plan offices, because frazzled workers will pay to hear nothing \u2014 and nothing is the cheapest thing we can record.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  throw new Error("MAKEFUN_OUTPUT_DIR is not set");
}

if (ENTRY.length === 0 || ENTRY.length > 200) {
  throw new Error(`entry is ${ENTRY.length} characters; gate requires 1-200`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be whitespace-only");
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("entry must be a single line");
}
if (!/^[^.!?]*[.!?]$/.test(ENTRY.trim())) {
  throw new Error("entry must be a single sentence");
}

fs.writeFileSync(path.join(outDir, "entry.txt"), ENTRY, "utf8");
