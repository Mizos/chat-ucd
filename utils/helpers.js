const moment=require('moment');

const generateMsg = function (from, text) {
   const time=moment().valueOf();
   return {
      from,
      text,
      createdAt: moment(time).format('h:mm a')
   }
}

module.exports={generateMsg};