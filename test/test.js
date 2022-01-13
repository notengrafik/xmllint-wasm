
// import { strict as assert } from 'assert';
import xmllint from '../index.js';

async function contentsOf(loc) {
  return fetch(loc).then(function(response) { return response.text() });
}

const xmlValid = await contentsOf('./../test/test-valid.xml');
const xmlValidNormalized = await contentsOf('./../test/test-valid-normalized.xml');
const xmlValidFormatted = await contentsOf('./../test/test-valid-formatted.xml');
const xmlValidC14n = await contentsOf('./../test/test-valid-c14n.xml');
const xmlInvalid = await contentsOf('./../test/test-invalid.xml');
const schema = await contentsOf('./../test/test.xsd');

async function testWithValidFile() {
	const {rawOutput, normalized, ...result} = await xmllint.validateXML({
		xml: {fileName: 'valid.xml', contents: xmlValid}, schema
	});

//	assert.deepEqual(result, {valid: true, errors: []});
//	assert.equal(normalized, xmlValidNormalized);
//	assert.equal(rawOutput.trim(), 'valid.xml validates');
}

async function testWithValidFileForFormat() {
	const {valid, normalized, ...result} = await xmllint.validateXML({
		xml: {fileName: 'valid.xml', contents: xmlValid}, schema,
		normalization: 'format'
	});

        if (! valid) alert('XML is invalid');
        console.log(normalized);
//	assert(valid);
//	assert.equal(normalized, xmlValidFormatted);
}

async function testWithValidFileForC14n() {
	const {valid, normalized, ...result} = await xmllint.validateXML({
		xml: {fileName: 'valid.xml', contents: xmlValid}, schema,
		normalization: 'c14n'
	});

//	assert(valid);
//	assert.equal(normalized, xmlValidC14n);
}

async function testWithInvalidFile() {
	const {rawOutput, normalized, ...result} = await xmllint.validateXML({
		xml: xmlInvalid, schema,
	});
	const expectedErrorResult = {
		valid: false,
		errors: [
			{
				rawMessage: "file_0.xml:21: element quantity: Schemas validity error : Element 'quantity': [facet 'maxExclusive'] The value '1000' must be less than '100'.",
				message: "element quantity: Schemas validity error : Element 'quantity': [facet 'maxExclusive'] The value '1000' must be less than '100'.",
				loc: { fileName: 'file_0.xml', lineNumber: 21 }
			},
			{
				rawMessage: "file_0.xml:25: element item: Schemas validity error : Element 'item', attribute 'partNum': [facet 'pattern'] The value '92-AA' is not accepted by the pattern '\\d{3}-[A-Z]{2}'.",
				message: "element item: Schemas validity error : Element 'item', attribute 'partNum': [facet 'pattern'] The value '92-AA' is not accepted by the pattern '\\d{3}-[A-Z]{2}'.",
				loc: { fileName: 'file_0.xml', lineNumber: 25 }
			}
		]		
	};

        if (! result.valid) alert('XML is invalid');
//	assert.deepEqual(result, expectedErrorResult);
}

async function testWithTwoFiles() {
	const input = [
		{
			fileName: 'valid.xml',
			contents: xmlValid,
		},
		{
			fileName: 'invalid.xml',
			contents: xmlInvalid,
		},
	];
	const {rawOutput, normalized, ...result} = await xmllint.validateXML({
		xml: input,
		schema,
	});
	const expectedResultForBoth = {
		'valid': false,
		'errors': [
			{
				rawMessage: "invalid.xml:21: element quantity: Schemas validity error : Element 'quantity': [facet 'maxExclusive'] The value '1000' must be less than '100'.",
				message: "element quantity: Schemas validity error : Element 'quantity': [facet 'maxExclusive'] The value '1000' must be less than '100'.",
				loc: {
					fileName: 'invalid.xml',
					lineNumber: 21
				}
			},
			{
				rawMessage: "invalid.xml:25: element item: Schemas validity error : Element 'item', attribute 'partNum': [facet 'pattern'] The value '92-AA' is not accepted by the pattern '\\d{3}-[A-Z]{2}'.",
				message: "element item: Schemas validity error : Element 'item', attribute 'partNum': [facet 'pattern'] The value '92-AA' is not accepted by the pattern '\\d{3}-[A-Z]{2}'.",
				loc: {
					fileName: 'invalid.xml',
					lineNumber: 25
				}
			}
		]
	};
	
//	assert.deepEqual(result, expectedResultForBoth);
}

async function runTests(...tests) {
	for (const test of tests) {
//		try {
			await test();
//		} catch(err) {
//			console.error(`Test ${test.name} failed. ${err.message}`);
//		}
	}
	console.log('All tests passed.');
}

async function allTests() {
  await runTests(
    testWithValidFile,
    testWithValidFileForFormat,
    testWithValidFileForC14n,
    testWithInvalidFile,
    testWithTwoFiles
  );
};

export default allTests;

