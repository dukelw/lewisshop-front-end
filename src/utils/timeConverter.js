import moment from 'moment-timezone';

export function convertToVietnamTime(isoDateString) {
  const vietnamTime = moment.utc(isoDateString).tz('Asia/Ho_Chi_Minh');
  return vietnamTime.format('DD/MM/YYYY, HH:mm:ss');
}
