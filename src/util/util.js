import moment from 'moment';

import { getUrl } from './services/networkUtils';

const defaultDateFormat = 'D MMM YYYY';

export const getImageSrc = path => `${getUrl('image')}/${path}`;
export const getThumbImageSrc = path => `${getUrl('thumb')}/${path}`;

export const getImageCreationDateTime = (dateStr) => {
  const format = `${defaultDateFormat} - HH:MM:SS`;
  return moment(dateStr).format(format);
};

export const getDefaultFormatedDate = dateStr => moment(dateStr).format(defaultDateFormat);

export const getFormattedFileSize = size => (size / 1000000).toFixed(2);
