# 🏥 Intelligent Campus Health Management System

This is a web-based Intelligent Campus Health Management System designed to improve healthcare delivery within a university setting. Built with HTML, CSS (Tailwind), and JavaScript, the system integrates Firebase for authentication, Firestore for real-time database, and a basic AI health chatbot to provide students, doctors, and administrators with a seamless healthcare experience.

## 🚀 Features

- 🔐 **Firebase Authentication**
  - Role-based login for Patients, Doctors, and Admins
  - Secure user registration and login
- 📅 **Appointment Booking**
  - Students can book appointments with available doctors
  - Doctors can view upcoming appointments
- 🧑‍⚕️ **Doctor Dashboard**
  - View booked appointments
  - Manage availability
- 👨‍💼 **Admin Panel**
  - Manage users (Patients, Doctors)
  - View system activities
- 🤖 **AI Health Chatbot**
  - Provides health tips and answers to basic health-related queries
- 📱 **Modern UI**
  - Responsive layout
  - Professional design inspired by [UDUTH](https://www.uduth.org.ng/)
- 🌙 **Dark Mode Toggle** *(Optional)*
- 📄 **Contact & FAQ Section**
  - Helps users understand how to use the system

  Technologies Used

- **Frontend:** HTML, Tailwind CSS, JavaScript
- **Backend/Database:** Firebase (Auth + Firestore)
- **AI Chatbot:** JavaScript-based simple NLP logic
- **Hosting:** Firebase Hosting (Ready for deployment)

📁 Project Structure

```bash
📦 intelligent-campus-health
├── index.html        # Main HTML file with all sections
├── style.css         # Tailwind-based custom styling
├── app.js            # Firebase setup, logic for login, dashboard, booking, chatbot
├── /images           # Icons, logos, doctor avatars, etc.
