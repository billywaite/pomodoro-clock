$(document).ready(function() {
  //session variables
  var minutes = 25;
  var seconds = 0;
  var recurMinutes = 25;
  var pomInterval;
  //break variables
  var breakSecs = 0;
  var breakMins = 5;
  var recurBreakMins = 5;
  var breakInterval;
  //maintenance variables
  var stopped = true;
  var currentlyDisplayed = 'session';
  /****************************************************
               Click to start the timer
 ******************************************************/
  $("#start").click(function() {
    //loop sets the interval initially and after session/break changes
    if (currentlyDisplayed == 'session') {
      pomInterval = setInterval(timer, 1000);
    } else if (currentlyDisplayed == 'break') {
      breakInterval = setInterval(breakTimer, 1000);
    }
    stopped = false;
    //timer function counts down until both minutes and seconds = 0  
    function timer() {
      document.getElementById("session").innerHTML = "Session";
      currentlyDisplayed = 'session';
      if (minutes <= 0 && seconds <= 0) {
        breakMins = recurBreakMins;
        breakInterval = setInterval(breakTimer, 1000);
        clearInterval(pomInterval);
      } else if (seconds <= 0) {
        seconds = 60;
        seconds -= 1;
        minutes -= 1;
      } else if (seconds <= 60) {
        seconds -= 1;
      }
      //variable zeroS adds a 0 as a placeholder when seconds is < 10
      var zeroS = ':';
      if (seconds < 10) {
        zeroS = ':0';
      }
      //variable zeroM adds a 0 as a placeholder when minutes < 10
      var zeroM = '';
      if (minutes < 10) {
        zeroM = '0';
      }
      document.getElementById("display").innerHTML = zeroM + minutes + zeroS + seconds;
    }
    /**************************************
        Stop button for pomodoro timer
     *************************************/
    $("#stop").click(function() {
      clearInterval(pomInterval);
      clearInterval(breakInterval);
      stopped = true;
    });
    /***************************************************
                Break Timer Function
  ***************************************************/
    function breakTimer() {
      document.getElementById("session").innerHTML = "Break";
      currentlyDisplayed = 'break';

      if (breakMins <= 0 && breakSecs <= 0) {
        minutes = recurMinutes;
        document.getElementById("session").innerHTML = "Session";
        pomInterval = setInterval(timer, 1000);
        clearInterval(breakInterval);
      } else if (breakSecs <= 0) {
        breakSecs = 60;
        breakSecs -= 1;
        breakMins -= 1;
      } else if (breakSecs <= 60) {
        breakSecs -= 1;
      }
      //variable zeroS adds a 0 as a placeholder when seconds is < 10
      var zeroS = ':';
      if (breakSecs < 10) {
        zeroS = ':0';
      }
      //variable zeroM adds a 0 as a placeholder when minutes < 10
      var zeroM = '';
      if (breakMins < 10) {
        zeroM = '0';
      }
      document.getElementById("display").innerHTML = zeroM + breakMins + zeroS + breakSecs;
    }
  }); //end closure for start button
  /***************************************************
              Reset Button
  **************************************************/
      $("#reset").click(function() {
      clearInterval(pomInterval);
      clearInterval(breakInterval);
      minutes = 25;
      seconds = 0;
      recurMinutes = 25;
      breakMins = 5;
      breakSecs = 0;
      recurBreakMins = 25;
      currentlyDisplayed = 'session';
      document.getElementById("session").innerHTML = "Session";
      document.getElementById("display").innerHTML = '25:00';
    });

  /****************************************************
              Change Session Length
  ****************************************************/
  $(".seshIncrease").click(function() {
    if (stopped == true) {
      minutes += 1;
      seconds = 0;
      recurMinutes = minutes;
      if (currentlyDisplayed == 'session') {
        document.getElementById("display").innerHTML = minutes;
        document.getElementById("sessionDisplay").innerHTML = minutes;
      } else {
        document.getElementById("sessionDisplay").innerHTML = minutes;
      }
    }
  });
  $(".seshDecrease").click(function() {
    if (stopped == true) {
      if (minutes > 1) {
        minutes -= 1;
        seconds = 0;
        recurMinutes = minutes;
        if (currentlyDisplayed == 'session') {
          document.getElementById("display").innerHTML = minutes;
          document.getElementById("sessionDisplay").innerHTML = minutes;
        } else {
          document.getElementById("sessionDisplay").innerHTML = minutes;
        }
      }
    }
  });

  /****************************************************
              Change Break Session Length
  ****************************************************/
  $(".breakIncrease").click(function() {
    if (stopped == true) {
      breakMins += 1;
      breakSecs = 0;
      recurBreakMins = breakMins;
      if (currentlyDisplayed == 'break') {
        document.getElementById("display").innerHTML = breakMins;
        document.getElementById("breakDisplay").innerHTML = breakMins;
      } else {
        document.getElementById("breakDisplay").innerHTML = breakMins;
      }
    }
  });
  $(".breakDecrease").click(function() {
    if (stopped == true) {
      if (breakMins > 1) {
        breakMins -= 1;
        breakSecs = 0;
        recurBreakMins = breakMins;
        if (currentlyDisplayed == 'break') {
          document.getElementById("display").innerHTML = breakMins;
          document.getElementById("breakDisplay").innerHTML = breakMins;
        } else {
          document.getElementById("breakDisplay").innerHTML = breakMins;
        }
      }
    }
  });
});