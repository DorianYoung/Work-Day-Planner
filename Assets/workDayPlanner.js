//FUNCTION DISPLAYS CURRENT DATE AND TIME IN HEADER
(function()
{
  // CREATED CURRENT DATE VAR
  var currentDate =  moment().format('LLL');
  
  // DISPLAY VALUE OF currentDate IN displayDate DIV
  var eDisplayMoment = document.getElementById('displayDate');
  eDisplayMoment.innerHTML = currentDate;
})();

