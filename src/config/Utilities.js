/* eslint-disable no-extend-native */
// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line func-names
import formatMoney from 'accounting-js/lib/formatMoney.js'

const toDate = function () {
  const [date, time] = this.split('T');

  return `${date.substring(8, 10)}-${date.substring(5, 7)}-${date.substring(0, 4)} ${time.substring(0, 2)}:${time.substring(3, 5)}:${time.substring(6, 8)}`;
};
String.prototype.toDate = toDate;

export function ConcatValues(amount1, amount2) {
  return parseFloat(`${amount1}.${amount2}`);
}

export function TimeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  return time;
}

export function FormatMoney(amount, type, showCurrency = false) {
  type = type.toUpperCase();
  if (type === 'BTC' || type === 'ETH' || type === 'C') {
    return showCurrency === true ?
      `${amount.toFixed(8).replace(/^0+(\d)|(\d)0+$/gm, '$1$2')} ${type}` :
      amount.toFixed(8).replace(/^0+(\d)|(\d)0+$/gm, '$1$2');
  }
  if (type === 'TRY' || type === 'USD') {
    return showCurrency === true ?
      formatMoney(amount, { symbol: type, precision: 2, thousand: '.', decimal: ',', format: '%v %s' }) :
      formatMoney(amount, { symbol: '', precision: 2, thousand: '.', decimal: ',' });
  }
  return showCurrency === true ?
    `${amount} ${type}` :
    amount;
}
