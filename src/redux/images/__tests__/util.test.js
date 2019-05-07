/* global testUtils */
import fs from 'fs';
import path from 'path';

import * as util from '../util';

describe('images util test suite', () => {
  const basePath = path.resolve(__dirname, '../__data__');
  let filePath;

  class BaseMockFileReader {
    abort() {}

    onerror() {}

    onload() {}

    readAsDataURL() {
      this.result = 'data:;base64,NzAxMDUxMDgxMDEzMjk5MTExMTEwMTE2MTAxMTEwMTE2';
      this.onload();
    }
  }

  const originalFileReader = FileReader;

  beforeEach(() => {
    window.FileReader = BaseMockFileReader;
  });

  afterEach(() => {
    window.FileReader = originalFileReader;
    // fileReaderOnLoadOnSpy.mockClear();

    // delete file if available
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  });

  it('should return promise resolve onload', async (done) => {
    // prepare test file
    filePath = `${basePath}/testFile.txt`;
    fs.writeFileSync(filePath, 'File content');

    // get file buffer from system
    const buffer = fs.readFileSync(filePath);
    const file = new File(buffer, 'textFile.txt');

    const result = await util.readAsDataURL(file);
    expect(result).toBeTruthy();

    done();
  });

  it('should return promise resolve onload', async (done) => {
    // set new error FileReaderMock
    class ErrorMockFileReader extends BaseMockFileReader {
      readAsDataURL() {
        this.onerror();
      }
    }

    // set error mock file reader
    window.FileReader = ErrorMockFileReader;

    // prepare test file
    filePath = `${basePath}/testFile.txt`;
    fs.writeFileSync(filePath, 'File content');

    // get file buffer from system
    const buffer = fs.readFileSync(filePath);
    const file = new File(buffer, 'textFile.txt');

    try {
      await util.readAsDataURL(file);
    } catch (error) {
      expect(error).toBeTruthy();
    }
    done();
  });
});
