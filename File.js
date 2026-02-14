let totalDoses = 0;
let takenDoses = 0;
let missedDoses = 0;
let reminderInterval = null;

// Request notification permission
function requestNotificationPermission() {
  if ("Notification" in window) {
    Notification.requestPermission();
  }
}

// Update UI
function updateUI() {
  document.getElementById("taken-dose").innerText = "Taken doses: " + takenDoses;
  document.getElementById("missed-dose").innerText = "Missed doses: " + missedDoses;
  const adherence = totalDoses === 0 ? 0 : Math.round((takenDoses / totalDoses) * 100);
  document.getElementById("alert-msg").innerText = `✅ Good adherence. Adherence: ${adherence}%`;
}

// Show notification
function showNotification() {
  if (Notification.permission === "granted") {
    new Notification("💊 Medicine Reminder", {
      body: "Time to take your medicine",
    });
  }
}

// Start reminder
function startReminder() {
  const dosesPerDay = Number(document.getElementById("doses-per-day").value);
  const days = Number(document.getElementById("course-days").value);
  const intervalHours = Number(document.getElementById("interval").value);

  if (!dosesPerDay || !days || !intervalHours) {
    alert("Please fill all fields!");
    return;
  }

  totalDoses = dosesPerDay * days;
  takenDoses = 0;
  missedDoses = 0;
  updateUI();

  requestNotificationPermission();

  if (reminderInterval) clearInterval(reminderInterval);

  reminderInterval = setInterval(() => {
    if (takenDoses + missedDoses >= totalDoses) {
      clearInterval(reminderInterval);
      alert("Medicine course complete 🎉");
      return;
    }
    showNotification();
  }, intervalHours * 60 * 60 * 1000);
}

// Button event listeners
document.getElementById("submit").addEventListener("click", startReminder);

document.getElementById("take-dose").addEventListener("click", () => {
  if (takenDoses + missedDoses < totalDoses) {
    takenDoses++;
    updateUI();
  } else {
    alert("Course complete!");
  }
});

document.getElementById("miss-dose").addEventListener("click", () => {
  if (takenDoses + missedDoses < totalDoses) {
    missedDoses++;
    updateUI();
  } else {
    alert("Course complete!");
  }
});
