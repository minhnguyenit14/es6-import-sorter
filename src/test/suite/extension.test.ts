import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import { formatImportSections } from '../../utils';
import { before, describe, it } from 'mocha';
// import * as myExtension from '../../extension';

function testData(title: string, config: any, output: any, expected: any) {
  // describe(title, function () {
  it('first-line-index', () => {
    assert.equal(output.firstLineIndex, expected.firstLineIndex);
  });

  it('first-character-index', () => {
    assert.equal(
      output.firstCharacterIndex,
      expected.firstCharacterIndex,
    );
  });
  it('last-line-index', () => {
    assert.equal(output.lastLineIndex, expected.lastLineIndex);
  });
  it('last-character-index', () => {
    assert.equal(output.lastCharacterIndex, expected.lastCharacterIndex);
  });
  it('formatted-text', () => {
    assert.equal(
      output.formattedText,
      Object.keys(config || {}).length
        ? expected.formattedText
        : expected.noConfigFormattedText,
    );
  });
  // });
}

describe('no-addition-ending-line', function () {
  let input = '',
    output: any = {},
    config = {},
    expected: any = {};

  before(async function () {
    const { input: inputData } = await import(
      './test-data/format-import-sections/no-addition-ending-line/input'
    );
    input = inputData.text;
    config = inputData.config;

    const { expected: expectedData } = await import(
      './test-data/format-import-sections/no-addition-ending-line/expected'
    );
    expected = expectedData;
    output = formatImportSections(input, config);
  });

  describe('no-config', function () {
    it('first-line-index', () => {
      assert.equal(output.firstLineIndex, expected.firstLineIndex);
    });

    it('first-character-index', () => {
      assert.equal(
        output.firstCharacterIndex,
        expected.firstCharacterIndex,
      );
    });
    it('last-line-index', () => {
      assert.equal(output.lastLineIndex, expected.lastLineIndex);
    });
    it('last-character-index', () => {
      assert.equal(
        output.lastCharacterIndex,
        expected.lastCharacterIndex,
      );
    });
    it('formatted-text', () => {
      assert.equal(
        output.formattedText,
        Object.keys(config || {}).length
          ? expected.formattedText
          : expected.noConfigFormattedText,
      );
    });
  });

  describe('has-config', () => {
    it('first-line-index', () => {
      assert.equal(output.firstLineIndex, output.firstLineIndex);
    });

    it('first-character-index', () => {
      assert.equal(
        output.firstCharacterIndex,
        expected.firstCharacterIndex,
      );
    });
    it('last-line-index', () => {
      assert.equal(output.lastLineIndex, expected.lastLineIndex);
    });
    it('last-character-index', () => {
      assert.equal(
        output.lastCharacterIndex,
        expected.lastCharacterIndex,
      );
    });
    it('formatted-text', () => {
      assert.equal(
        output.formattedText,
        Object.keys(config || {}).length
          ? expected.formattedText
          : expected.noConfigFormattedText,
      );
    });
  });
});

describe('has-empty-ending-line', () => {
  let input = '',
    output: any = {},
    config = {},
    expected: any = {};

  before(async () => {
    const { input: inputData } = await import(
      './test-data/format-import-sections/has-empty-ending-line/input'
    );
    input = inputData.text;
    config = inputData.config;

    const { expected: expectedData } = await import(
      './test-data/format-import-sections/has-empty-ending-line/expected'
    );
    expected = expectedData;
    output = formatImportSections(input, config);
  });

  describe('no-config', function () {
    it('first-line-index', () => {
      assert.equal(output.firstLineIndex, expected.firstLineIndex);
    });

    it('first-character-index', () => {
      assert.equal(
        output.firstCharacterIndex,
        expected.firstCharacterIndex,
      );
    });
    it('last-line-index', () => {
      assert.equal(output.lastLineIndex, expected.lastLineIndex);
    });
    it('last-character-index', () => {
      assert.equal(
        output.lastCharacterIndex,
        expected.lastCharacterIndex,
      );
    });
    it('formatted-text', () => {
      assert.equal(
        output.formattedText,
        Object.keys(config || {}).length
          ? expected.formattedText
          : expected.noConfigFormattedText,
      );
    });
  });

  describe('has-config', () => {
    it('first-line-index', () => {
      assert.equal(output.firstLineIndex, output.firstLineIndex);
    });

    it('first-character-index', () => {
      assert.equal(
        output.firstCharacterIndex,
        expected.firstCharacterIndex,
      );
    });
    it('last-line-index', () => {
      assert.equal(output.lastLineIndex, expected.lastLineIndex);
    });
    it('last-character-index', () => {
      assert.equal(
        output.lastCharacterIndex,
        expected.lastCharacterIndex,
      );
    });
    it('formatted-text', () => {
      assert.equal(
        output.formattedText,
        Object.keys(config || {}).length
          ? expected.formattedText
          : expected.noConfigFormattedText,
      );
    });
  });
});

describe('with-content-below-with-separator', async () => {
  let input = '',
    output: any = {},
    config = {},
    expected: any = {};

  before(async () => {
    const { input: inputData } = await import(
      './test-data/format-import-sections/with-content-below-with-separator/input'
    );
    input = inputData.text;
    config = inputData.config;

    const { expected: expectedData } = await import(
      './test-data/format-import-sections/with-content-below-with-separator/expected'
    );
    expected = expectedData;
    output = formatImportSections(input, config);
  });

  describe('no-config', function () {
    it('first-line-index', () => {
      assert.equal(output.firstLineIndex, expected.firstLineIndex);
    });

    it('first-character-index', () => {
      assert.equal(
        output.firstCharacterIndex,
        expected.firstCharacterIndex,
      );
    });
    it('last-line-index', () => {
      assert.equal(output.lastLineIndex, expected.lastLineIndex);
    });
    it('last-character-index', () => {
      assert.equal(
        output.lastCharacterIndex,
        expected.lastCharacterIndex,
      );
    });
    it('formatted-text', () => {
      assert.equal(
        output.formattedText,
        Object.keys(config || {}).length
          ? expected.formattedText
          : expected.noConfigFormattedText,
      );
    });
  });

  describe('has-config', () => {
    it('first-line-index', () => {
      assert.equal(output.firstLineIndex, output.firstLineIndex);
    });

    it('first-character-index', () => {
      assert.equal(
        output.firstCharacterIndex,
        expected.firstCharacterIndex,
      );
    });
    it('last-line-index', () => {
      assert.equal(output.lastLineIndex, expected.lastLineIndex);
    });
    it('last-character-index', () => {
      assert.equal(
        output.lastCharacterIndex,
        expected.lastCharacterIndex,
      );
    });
    it('formatted-text', () => {
      assert.equal(
        output.formattedText,
        Object.keys(config || {}).length
          ? expected.formattedText
          : expected.noConfigFormattedText,
      );
    });
  });
});

describe('with-content-below-with-no-separator', async function () {
  let input = '',
    output: any = {},
    config = {},
    expected: any = {};

  before(async () => {
    const { input: inputData } = await import(
      './test-data/format-import-sections/with-content-below-with-no-separator/input'
    );
    input = inputData.text;
    config = inputData.config;

    const { expected: expectedData } = await import(
      './test-data/format-import-sections/with-content-below-with-no-separator/expected'
    );
    expected = expectedData;
    output = formatImportSections(input, config);
  });

  describe('no-config', function () {
    it('first-line-index', () => {
      assert.equal(output.firstLineIndex, expected.firstLineIndex);
    });

    it('first-character-index', () => {
      assert.equal(
        output.firstCharacterIndex,
        expected.firstCharacterIndex,
      );
    });
    it('last-line-index', () => {
      assert.notEqual(output.lastLineIndex, expected.lastLineIndex);
    });
    it('last-character-index', () => {
      assert.notEqual(output.lastCharacterIndex, expected.lastCharacterIndex);
    });
    it('formatted-text', () => {
      assert.notEqual(
        output.formattedText,
        Object.keys(config || {}).length
          ? expected.formattedText
          : expected.noConfigFormattedText,
      );
    });
  });

  describe('has-config', () => {
    it('first-line-index', () => {
      assert.equal(output.firstLineIndex, output.firstLineIndex);
    });

    it('first-character-index', () => {
      assert.equal(
        output.firstCharacterIndex,
        expected.firstCharacterIndex,
      );
    });
    it('last-line-index', () => {
      assert.notEqual(output.lastLineIndex, expected.lastLineIndex);
    });
    it('last-character-index', () => {
      assert.notEqual(output.lastCharacterIndex, expected.lastCharacterIndex);
    });
    it('formatted-text', () => {
      assert.notEqual(
        output.formattedText,
        Object.keys(config || {}).length
          ? expected.formattedText
          : expected.noConfigFormattedText,
      );
    });
  });
});
