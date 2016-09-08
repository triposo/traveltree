export function calculateSize(rank, count) {
  var size, index, total
  var sum = 0
  for (var i = 0; i <= 5; i++) {
    if (rank <= sum) {
      size = i
      index = i - 1 - (sum - rank)
      total = i
      break
    }
    sum = sum + i + 1
  }

  if (typeof size === 'undefined') {
    size = 6
    index = 5 + (rank - sum)
    total = count - sum + 5
  }

  var result = {size, index, total}
  return result
}


//credit: http://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors/13542669#13542669
/* eslint-disable */
export function shadeColor(color, percent) {
  var f=parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
  return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
}
/* eslint-enable */
