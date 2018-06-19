import moment from 'moment'

export const API_URL = 'https://api.github.com';

export const URL_REGEXP = /^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!-/])*)?/;
export const DATE_REGEXP = /^\d{4}(-|\/)\d{2}\1\d{2}?/;
export const TYPE_CHECKER = (value) => {
  if (!value) return false;
  if (URL_REGEXP.test(value)) {
    return `<a href="${value}">${value}</a>`
  } else if (value.spdx_id) {
    return value.spdx_id
  } else if (DATE_REGEXP.test(value)) {
    return moment(value, "YYYY-MM-DD").fromNow()
  } else {
    return value;
  }
}

export const ITEMS_ON_LIST = 5;