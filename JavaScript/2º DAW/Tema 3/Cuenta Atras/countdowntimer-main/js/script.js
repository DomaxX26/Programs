// Set the date we're counting down to
var countDownDate = new Date("Feb 28, 2022 10:00:00").getTime();

// Update the count down every 1 second
var x = setInterval(function () {

  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the element with id="demo"
  document.getElementById("days").innerHTML = days;
  document.getElementById("hours").innerHTML = hours;
  document.getElementById("minutes").innerHTML = minutes;
  document.getElementById("seconds").innerHTML = seconds;

  // Display effects in circle
  effectCircle(days, hours, minutes, seconds);

  // If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("demo").innerHTML = "EXPIRED";
  }
}, 1000);

effectCircle = function(d, h, m, s){
  const max_second = 60; // max value second
  const max_minute = 60; // max value second
  const max_hour = 24; // max value second
  const max_day = 30; // max value second

  const strokeDashoffset = 439; // value stroke-dasharray (change by size circle) 
  var chart = document.getElementsByClassName("chart");

  // days circle
  var strokeDashoffsetPerDay = strokeDashoffset / max_day;
  var size = strokeDashoffset - (strokeDashoffsetPerDay * d);
  chart[0].style.strokeDashoffset = size ;

  // hours circle
  var strokeDashoffsetPerHour = strokeDashoffset / max_hour;
  var size = strokeDashoffset - (strokeDashoffsetPerHour * h);
  chart[1].style.strokeDashoffset = size ;

  // minutes circle
  var strokeDashoffsetPerMinute = strokeDashoffset / max_minute;
  var size = strokeDashoffset - (strokeDashoffsetPerMinute * m);
  chart[2].style.strokeDashoffset = size ;

  // seconds circle
  var strokeDashoffsetPerSecond = strokeDashoffset / max_second;
  var size = strokeDashoffset - (strokeDashoffsetPerSecond * s);
  chart[3].style.strokeDashoffset = size ;

}