import { parseCSV } from "../src/basic-parser";
import * as path from "path";


const COMMAS_CSV_PATH = path.join(__dirname, "../data/commas.csv");
const NEWLINES_CSV_PATH = path.join(__dirname, "../data/newlines.csv");


test("commas within fields", async () => {
  const results = await parseCSV(COMMAS_CSV_PATH)
  
  expect(results).toHaveLength(2);
  expect(results[0]).toEqual(["Title", "Authors", "Year"]);
  expect(results[1]).toEqual(["Little Tricky Logic: Misconceptions in the Understanding of LTL", "Ben Greenman, Sam Saarinen, Tim Nelson, Shriram Krishnamurthi", "2023"]);
});

test("newlines within fields", async () => {
  const results = await parseCSV(NEWLINES_CSV_PATH)
  
  expect(results).toHaveLength(2);
  expect(results[0]).toEqual(["Author", "Stanza", "Text"]);
  // This might not be the exact format we want, but we can explore that in sprint 2.
  expect(results[1]).toEqual(["Samuel Taylor Coleridge", "1", 
`In Xanadu did Kubla Khan
A stately pleasure-dome decree:
Where Alph, the sacred river, ran
Through caverns measureless to man
     Down to a sunless sea.`]);
});

// UNTESTED: escaped quotes in field value
