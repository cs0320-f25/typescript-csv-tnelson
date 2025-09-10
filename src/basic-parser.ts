import * as fs from "fs";
import * as readline from "readline";
import z, { ZodSafeParseError, ZodSafeParseSuccess } from 'zod'

/**
 * 
 * SPRINT 1 VERSION (Prototype)
 * 
 * Parse a CSV-formatted file into an array of row values. 
 * Sprint 1 does not include headers, and so the indexes of the row values
 * are not well-defined UNLESS THE SCHEMA DOES TRANSLATION. 
 * 
 * If no schema is provided, the default behavior is as in the starter code.
 * 
 * @param path The path to the file being loaded.
 * @param schema (Optional) A Zod schema for validating an array (for a row) and producing something of the expected type T
 * @returns a "promise" to produce a 2-d array. If a schema is provided, each element will be either a Zod parse result. If a schema is not provided, each element will be a string[].
 */
export async function parseCSV<T>(path: string, givenSchema?: z.ZodType<T>): 
   Promise<(ZodSafeParseSuccess<T> | ZodSafeParseError<T>)[] | string[][]> {
  const fileStream = fs.createReadStream(path);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity, // handle different line endings
  });
  
  // Proceed in stages: first get a string[][], and then convert it if the schema is present.
  // This allows TypeScript to infer the union above. If we tried to do this all at once, 
  // the inferred type is Promise<(ZodSafeParseSuccess<T> | ZodSafeParseError<T> | string[])[]>.
  // (Amusingly, this problem goes away in sprint 2!)

  // Give a type here and for convertedResult below, or it will implicitly be any[].
  const rawResult: string[][] = []
  for await (const line of rl) {
    const row = line.split(",").map((v) => v.trim())
    rawResult.push(row)
  }
  
  // Now we have the string[][] parsed. Either process it via a schema, or return it.
  if(givenSchema !== undefined) {
    // We have to tell TypeScript what kind of empty array this is.
    const convertedResult: (ZodSafeParseSuccess<T> | ZodSafeParseError<T>)[] = []
    for(const row of rawResult) 
        convertedResult.push(givenSchema.safeParse(row)) 
    return convertedResult
  }
  
  return rawResult
}
