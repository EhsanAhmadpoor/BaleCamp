import moment from 'jalali-moment'

const formatDate = (dateString: string) => {
  const date = moment(dateString);
  const persianMonths = [
    'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
    'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
  ];

  const year = date.format('jYYYY'); // Jalali year
  const monthIndex = parseInt(date.format('jM')) - 1; // Convert Jalali month to 0-based index
  const day = date.format('jD'); // Jalali day

  // Get the Persian month name
  const monthName = persianMonths[monthIndex];

  return `${day} ${monthName} ${year}`;
};

export default formatDate