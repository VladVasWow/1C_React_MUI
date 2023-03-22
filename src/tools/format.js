import dayjs from 'dayjs';

export const ccyFormat = (num) => {
    return `${num.toFixed(2)}`;
  }

export const odata1cDateFormat = (dayjsDate) => {
    return dayjsDate.format('YYYY-MM-DDTHH:mm:ss');
  }
