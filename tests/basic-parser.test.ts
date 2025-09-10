import { parseCSV } from "../src/basic-parser";
import * as path from "path";
import { PersonRowSchema } from "../src/schemas"

const PEOPLE_CSV_PATH = path.join(__dirname, "../data/people.csv");

test("parseCSV yields arrays (no schema)", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH)
  
  expect(results).toHaveLength(5);
  expect(results[0]).toEqual(["name", "age"]);
  expect(results[1]).toEqual(["Alice", "23"]);
  expect(results[2]).toEqual(["Bob", "thirty"]); 
  expect(results[3]).toEqual(["Charlie", "25"]);
  expect(results[4]).toEqual(["Nim", "22"]);
});

test("parseCSV yields only arrays (no schema)", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH)
  for(const row of results) {
    expect(Array.isArray(row)).toBe(true);
  }
});

test("parseCSV yields Zod objects (schema)", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH, PersonRowSchema)
  
  expect(results).toHaveLength(5);
  expect(results[0]).toMatchObject({success: false})
  expect(results[1]).toMatchObject({success: true, data: {name: 'Alice', age: 23}})
  expect(results[2]).toMatchObject({success: false}) 
  expect(results[3]).toMatchObject({success: true, data: {name: 'Charlie', age: 25}})
  expect(results[4]).toMatchObject({success: true, data: {name: 'Nim', age: 22}}) 
});

