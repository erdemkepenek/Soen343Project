import moment from "moment";

export function historyBuilder(history, callback) {
  let thisYear = parseInt(moment(new Date()).format("YYYY"));
  let year = {};
  for (thisYear; thisYear >= 2018; thisYear--) {
    year[thisYear] = {};
    for (let i = 1; i <= 12; i++) {
      let number = i > 9
        ? "" + i.toString()
        : "0" + i.toString()
      let month = moment(thisYear.toString() + '-' + number, "YYYY-MM").format('MMMM');
      year[thisYear][month] = {
        filled: false
      };
      let monthDays = moment(thisYear.toString() + '-' + number, "YYYY-MM").daysInMonth()
      for (let j = 1; j <= parseInt(monthDays); j++) {
        let day = j.toString()
        year[thisYear][month][day] = [];
      }
    }
  }
  if (history) {
    history.map((historyData) => {
      let historyYear = moment(historyData.time).format('YYYY');
      let historyMonth = moment(historyData.time).format('MMMM');
      let historyDay = parseInt(moment(historyData.time).format('DD')) < 10
        ? moment(historyData.time).format('DD').replace("0", "")
        : moment(historyData.time).format('DD');
      year[historyYear][historyMonth][historyDay].push(historyData);
      year[historyYear][historyMonth]["filled"] = true;
    })
  }
  callback(year)
}
