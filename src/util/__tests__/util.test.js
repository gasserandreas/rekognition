import moment from 'moment';

import * as util from '../util';
import { getUrl } from '../services/networkUtils';

// defaults
const dateString = '2019-02-09T08:12:11.736Z';
const imageName = 'my-image.jpg';
const size = 2264753;

it('should return correct image src', () => {
  const basePath = getUrl('image');
  const path = `${basePath}/${imageName}`;
  expect(util.getImageSrc(imageName)).toEqual(path);
});

it('should return correct thumb image src', () => {
  const basePath = getUrl('thumb');
  const path = `${basePath}/${imageName}`;
  expect(util.getThumbImageSrc(imageName)).toEqual(path);
});

it('should return correct image creation date time', () => {
  const format = 'D MMM YYYY - HH:MM:SS';
  expect(util.getImageCreationDateTime(dateString)).toEqual(moment(dateString).format(format));
});

it('should return default formated date string', () => {
  const date = '9 Feb 2019';
  expect(util.getDefaultFormatedDate(dateString)).toEqual(date);
});

it('should return formatted file size', () => {
  const formattedFileSize = '2.26';
  expect(util.getFormattedFileSize(size)).toEqual(formattedFileSize);
});
