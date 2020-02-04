
$(document).ready(function() {
  
    //VARIABLES
    var nowHour24 = moment().format('H');
    var nowHour12 = moment().format('h');
    var $plannerDiv = $('#plannerContainer');
    $plannerDiv.empty();
  
    // USING JSON TO STORE AND GRAB INPUT TO LOCAL STORAGE
    var storedPlans = JSON.parse(localStorage.getItem("storedPlans"));
  
    if (storedPlans !== null) {
      planTextArr = storedPlans;
    } else {
      planTextArr = new Array(9);
    }
  
    //FUNCTION DISPLAYS CURRENT DATE AND TIME IN HEADER
    (function(){
        // current date var
        var currentDate =  moment().format('LLL');
  
        // display currentDate in displayDate div
        var eDisplayMoment = document.getElementById('displayDate');
        eDisplayMoment.innerHTML = currentDate;
    })();
  
    //FOR LOOP TO BUILD CALENDER
    for (var hour = 9; hour <= 17; hour++) {
      var index = hour - 9;
      var $rowDiv = $('<div>');
      $rowDiv.addClass('row');
      $rowDiv.addClass('scheduleRow');
      $rowDiv.attr('hour-index',hour);
    
      // TIME BOX PORTION
      var $col2TimeDiv = $('<div>');
      $col2TimeDiv.addClass('col-md-2');
    
      // create timeBox element
      var $timeBoxSpn = $('<span>');
      $timeBoxSpn.attr('class','timeBox');
      
      // format hours
      var displayHour = 0;
      var ampm = "";

      if (hour > 12) { 
        displayHour = hour - 12;
        ampm = "pm";
      } else {
        displayHour = hour;
        ampm = "am";
      }
      
      // adds hour to time box col
      $timeBoxSpn.text(`${displayHour} ${ampm}`);
      $rowDiv.append($col2TimeDiv);
      $col2TimeDiv.append($timeBoxSpn);
     
      // TEXT INPUT PORTION
      var $dailyPlanSpn = $('<input>');
  
      $dailyPlanSpn.attr('id',`input-${index}`);
      $dailyPlanSpn.attr('hour-index',index);
      $dailyPlanSpn.attr('type','text');
      $dailyPlanSpn.attr('class','dailyPlan');
  
      // index from data array
      $dailyPlanSpn.val( planTextArr[index] );
      
      // creates col for text imput field
      var $col9IptDiv = $('<div>');
      $col9IptDiv.addClass('col-md-9');
  
      $rowDiv.append($col9IptDiv);
      $col9IptDiv.append($dailyPlanSpn);
    
  
      // SAVE BUTTON PORTION
      var $col1SaveDiv = $('<div>');
      $col1SaveDiv.addClass('col-md-1');
      
      //displays font awesome logo
      var $saveBtn = $('<i>');
      $saveBtn.attr('id',`saveid-${index}`);
      $saveBtn.attr('save-id',index);
      $saveBtn.attr('class',"fa fa-save");
      $saveBtn.attr('style',"font-size:24px");

      $rowDiv.append($col1SaveDiv);
      $col1SaveDiv.append($saveBtn);
      
  
      // ROW COLOR BASED ON TIME
      updateRowColor($rowDiv, hour);
      
      // replace old row in container
      $plannerDiv.append($rowDiv);
    };
  
    // FUNCTION TO UPDATE ROW COLOR
    function updateRowColor ($hourRow,hour) { 
      if ( hour < nowHour24) {
        $hourRow.css("background-color","lightgrey")
      } 
      else if ( hour > nowHour24) {
        $hourRow.css("background-color","lightgreen")
      } 
      else {
        $hourRow.css("background-color","#ff4870")
      }
    };
  
    //LOCAL STORAGE
    $(document).on('click','i', function(event) {
      event.preventDefault();  
      var $index = $(this).attr('save-id');
      var inputId = '#input-'+$index;
      var $value = $(inputId).val();
  
      planTextArr[$index] = $value;
      localStorage.setItem("storedPlans", JSON.stringify(planTextArr));
    });  
    
    // COLOR SAVE BUTTON ON CHANGE OF INPUT
    $(document).on('change','input', function(event) {
      event.preventDefault();  
      var i = $(this).attr('hour-index');
    });
});


