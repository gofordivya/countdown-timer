$(document).ready(function () {
  var timer;
  var isRunning = false;

  function startCountdown(duration, display) {
    var timer = duration;
    var hours;
    var minutes;
    var seconds;

    var countdownInterval = setInterval(function () {
      hours = parseInt(timer / 3600, 10);
      minutes = parseInt((timer % 3600) / 60, 10);
      seconds = parseInt(timer % 60, 10);

      hours = hours < 10 ? "0" + hours : hours;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      display.text(hours + ":" + minutes + ":" + seconds);

      if (--timer < 0) {
        clearInterval(countdownInterval);
        isRunning = false;
        display.text("00:00:00");
        playNotification();
      }
    }, 1000);
  }

  function playNotification() {
    var audio = new Audio(
      "https://cdn.freesound.org/previews/536/536420_4921277-lq.mp3"
    );
    audio.play();
  }

  $("#start").on("click", function () {
    if (!isRunning) {
      var time = $("#timer").text().split(":");
      var hours = parseInt(time[0]);
      var minutes = parseInt(time[1]);
      var seconds = parseInt(time[2]);
      var totalSeconds = hours * 3600 + minutes * 60 + seconds;

      startCountdown(totalSeconds, $("#timer"));
      isRunning = true;
    }
  });

  $("#reset").on("click", function () {
    clearInterval(timer);
    isRunning = false;
    $("#timer").text("00:25:00");
  });

  $("#setCustomTime").on("click", function () {
    if (!isRunning) {
      var customTime = $("#customTime").val();
      $("#timer").text("00:" + customTime + ":00");
    }
  });

  $("#plus").on("click", function () {
    if (!isRunning) {
      var currentCustomTime = parseInt($("#customTime").val());
      $("#customTime").val(currentCustomTime + 1);
    }
  });

  $("#minus").on("click", function () {
    if (!isRunning) {
      var currentCustomTime = parseInt($("#customTime").val());
      if (currentCustomTime > 1) {
        $("#customTime").val(currentCustomTime - 1);
      }
    }
  });
});
