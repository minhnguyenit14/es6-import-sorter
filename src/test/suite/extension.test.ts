import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import { formatImportSections } from '../../utils';
import { before } from 'mocha';
// import * as myExtension from '../../extension';

function testData(input: any, config: any, expected: any) {
  test('test', () => {
    const output = formatImportSections(input, config);
    assert.strictEqual(output.firstLineIndex, expected.firstLineIndex);
    assert.strictEqual(
      output.firstCharacterIndex,
      expected.firstCharacterIndex,
    );
    assert.strictEqual(output.lastLineIndex, expected.lastLineIndex);
    assert.strictEqual(output.lastCharacterIndex, expected.lastCharacterIndex);
    assert.strictEqual(output.formattedText, expected.formattedText);
  });
}

suite('-- formatImportSections Testing', () => {
  test('no-addition-ending-line', function () {
    let input = '',
      config = {},
      expected: any = {};

    before(async function getTestData(done) {
      const { input: inputData } = await import(
        './test-data/format-import-sections/no-addition-ending-line/input'
      );
      input = inputData.text;
      config = inputData.config;

      const { expected: expectedData } = await import(
        './test-data/format-import-sections/no-addition-ending-line/expected'
      );
      expected = expectedData;

      done();
    });

    testData(input, config, expected);
  });

  test('has-empty-ending-line', () => {
    let input = '',
      config = {},
      expected: any = {};

    before(async function getTestData(done) {
      const { input: inputData } = await import(
        './test-data/format-import-sections/has-empty-ending-line/input'
      );
      input = inputData.text;
      config = inputData.config;

      const { expected: expectedData } = await import(
        './test-data/format-import-sections/has-empty-ending-line/expected'
      );
      expected = expectedData;

      done();
    });

    testData(input, config, expected);
  });

  test('with-content-below-with-separator', () => {
    let input = '',
      config = {},
      expected: any = {};

    before(async function getTestData(done) {
      const { input: inputData } = await import(
        './test-data/format-import-sections/with-content-below-with-separator/input'
      );
      input = inputData.text;
      config = inputData.config;

      const { expected: expectedData } = await import(
        './test-data/format-import-sections/with-content-below-with-separator/expected'
      );
      expected = expectedData;

      done();
    });

    testData(input, config, expected);
  });
});
