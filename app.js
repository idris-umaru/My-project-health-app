// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyByd3g_Eg01ldmUjFphG8jXBcOI3WiZtIE",
  authDomain: "intelligent-campus-health.firebaseapp.com",
  projectId: "intelligent-campus-health",
  storageBucket: "intelligent-campus-health.firebasestorage.app",
  messagingSenderId: "317684351571",
  appId: "1:317684351571:web:65d462302dc9957efb3ca6",
  measurementId: "G-G6RWP9YBJQ"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// ============================
// AUTH SECTION
// ============================

// Register
document.getElementById("registerBtn")?.addEventListener("click", () => {
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPassword").value;
  const role = document.getElementById("regRole").value;
  const fullName = document.getElementById("regName").value;

  auth.createUserWithEmailAndPassword(email, password)
    .then((cred) => {
      return db.collection("users").doc(cred.user.uid).set({
        fullName,
        email,
        role
      });
    })
    .then(() => {
      alert("Registered successfully!");
      window.location.href = "index.html";
    })
    .catch(err => alert(err.message));
});

// Login
document.getElementById("loginBtn")?.addEventListener("click", () => {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  auth.signInWithEmailAndPassword(email, password)
    .then((cred) => {
      return db.collection("users").doc(cred.user.uid).get();
    })
    .then(doc => {
      const user = doc.data();
      sessionStorage.setItem("user", JSON.stringify(user));
      window.location.href = "dashboard.html";
    })
    .catch(err => {
      console.error("Login Error:", err.message);
      alert("Invalid login credentials.");
    });
});

// Logout
document.getElementById("logoutBtn")?.addEventListener("click", () => {
  auth.signOut().then(() => {
    sessionStorage.clear();
    window.location.href = "index.html";
  });
});

// ============================
// DASHBOARD LOAD
// ============================
window.onload = () => {
  if (window.location.pathname.includes("dashboard.html")) {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (!user) {
      window.location.href = "index.html";
      return;
    }

    document.getElementById("welcomeName").innerText = `Welcome, ${user.fullName}`;
    document.getElementById("userEmail").innerText = user.email;
    document.getElementById("userRole").innerText = user.role;

    // If patient, show appointment section
    if (user.role === "patient") {
      document.getElementById("appointmentSection").style.display = "block";
    }

    loadAppointments();
  }
};

// ============================
// BOOK APPOINTMENT
// ============================
document.getElementById("bookBtn")?.addEventListener("click", () => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const date = document.getElementById("appDate").value;
  const reason = document.getElementById("appReason").value;

  if (!date || !reason) {
    alert("Please complete the appointment form.");
    return;
  }

  db.collection("appointments").add({
    userId: user.email,
    name: user.fullName,
    date,
    reason,
    createdAt: new Date()
  })
    .then(() => {
      alert("Appointment booked successfully.");
      loadAppointments();
    })
    .catch(err => alert("Error booking appointment: " + err.message));
});

// ============================
// LOAD APPOINTMENTS
// ============================
function loadAppointments() {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const appList = document.getElementById("appointmentList");
  if (!appList) return;

  appList.innerHTML = "Loading appointments...";

  db.collection("appointments")
    .where("userId", "==", user.email)
    .get()
    .then(snapshot => {
      if (snapshot.empty) {
        appList.innerHTML = "<p>No appointments yet.</p>";
        return;
      }

      let html = "";
      snapshot.forEach(doc => {
        const app = doc.data();
        html += `
          <div class="bg-white shadow p-3 rounded my-2">
            <p><strong>Date:</strong> ${app.date}</p>
            <p><strong>Reason:</strong> ${app.reason}</p>
            <p><em>Booked on ${app.createdAt.toDate().toLocaleString()}</em></p>
          </div>
        `;
      });
      appList.innerHTML = html;
    })
    .catch(err => {
      appList.innerHTML = "Failed to load appointments.";
      console.error(err);
    });
}

// ============================
// COMPLAINT SECTION
// ============================
document.getElementById("submitComplaint")?.addEventListener("click", () => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const complaintText = document.getElementById("complaintText").value;

  if (!complaintText) {
    alert("Please write your complaint.");
    return;
  }

  db.collection("complaints").add({
    email: user.email,
    complaint: complaintText,
    submittedAt: new Date()
  })
    .then(() => {
      alert("Complaint submitted.");
      document.getElementById("complaintText").value = "";
    })
    .catch(err => alert("Failed to submit complaint: " + err.message));
});

// ============================
// AI CHATBOT (SIMPLE MOCK)
// ============================
document.getElementById("chatSendBtn")?.addEventListener("click", () => {
  const input = document.getElementById("chatInput").value.trim();
  const chatBox = document.getElementById("chatBox");

  if (!input) return;

  const reply = getAIResponse(input);
  chatBox.innerHTML += `
    <div class="my-2">
      <div class="text-right font-semibold text-blue-600">You: ${input}</div>
      <div class="text-left text-gray-700">AI: ${reply}</div>
    </div>
  `;

  document.getElementById("chatInput").value = "";
});

function getAIResponse(message) {
  const lower = message.toLowerCase();
  if (lower.includes("headache")) return "Take enough rest, stay hydrated, and avoid stress. If symptoms persist, see a doctor.";
  if (lower.includes("clinic hours")) return "Our campus clinic opens from 8:00 AM to 5:00 PM, Monday to Friday.";
  if (lower.includes("emergency")) return "In case of emergency, call the campus emergency number or go directly to the nearest hospital.";
  return "I'm not sure how to help with that. Please contact the campus clinic directly for more info.";
}
// Toggle Login/Register Forms
function showLoginForm() {
  document.getElementById('loginForm').classList.remove('hidden');
  document.getElementById('registerForm').classList.add('hidden');
  document.getElementById('loginToggleBtn').classList.add('bg-green-800');
  document.getElementById('registerToggleBtn').classList.remove('bg-blue-800');
}

function showRegisterForm() {
  document.getElementById('registerForm').classList.remove('hidden');
  document.getElementById('loginForm').classList.add('hidden');
  document.getElementById('registerToggleBtn').classList.add('bg-blue-800');
  document.getElementById('loginToggleBtn').classList.remove('bg-green-800');
}

// Optional: Auto-show login on load
document.addEventListener('DOMContentLoaded', showLoginForm);
