import moment from 'moment';

import { getUrl } from '../util/services/networkUtils';

export const getImageSrc = path => `${getUrl('thumb')}/${path}`;

export const getImageCreationDateTime = dateStr => {
  const format = 'D MMM YYYY - HH:MM:SS';
  return moment(dateStr).format(format);
}

export const getImageCreationDate = dateStr => {
  const format = 'D MMM YYYY';
  return moment(dateStr).format(format);
}