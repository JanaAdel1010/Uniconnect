## 📚 UniConnect

**UniConnect** is a campus assistance platform built to help students easily navigate university life. It provides features like classroom and doctor lookup, session schedules, lost & found reporting, and peer partner finding.

---

### 🚀 Features

* 🔐 **User Authentication**
  Secure login & registration with JWT and hashed passwords using `bcryptjs`.

* 🧑‍🏫 **Find a Doctor**
  Quickly locate a doctor’s office and working hours.

* 🏫 **Find a Classroom**
  Search for a room to get its building and floor.

* 🗕️ **Session Lookup**
  Search for lectures, labs, or sections for location, Instructor and time.

* 🡭🡮 **Partner Finder**
  Match students based on shared skills and interests.

* 📦 **Lost & Found**
  Report lost/found items on campus.

* 🗘️ **Campus Map Integration**
  User-friendly map-based navigation for all the above features.

---

### 💠 Tech Stack

**Frontend:**

* HTML, CSS, JavaScript
* Vanilla JS DOM manipulation

**Backend:**

* Node.js + Express
* Sequelize ORM + MySQL
* REST API structure

**Other Tools:**

* XAMPP for MySQL server
* Postman for testing APIs
* Git & GitHub for version control

---

### 📂 Folder Structure

```
UniConnect/

🗄️ Backend/
🗄️   ├── config/             # DB configuration
🗄️   ├── controllers/        # API logic (auth, partner, lookup)
🗄️   ├── middleware/         # Auth middleware
🗄️   ├── models/             # Sequelize models (User, Doctor, Place, Session)
🗄️   ├── routes/             # API routes
🗄️   └── server.js           # Main server file

🗄️ Frontend/
🗄️   ├── contactUs.html
🗄️   ├── jana.JPG
🗄️   ├── style.css
🗄️   ├── laila.png
🗄️   ├── login.html
🗄️   ├── login.css
🗄️   ├── loginpic.jpeg
🗄️   ├── lost-and-found.png
🗄️   ├── map.png
🗄️   ├── nour.JPG
🗄️   ├── partner.png
🗄️   ├── register.html
🗄️   ├── register.js
🗄️   ├── shahd.png
🗄️   ├── trial.html
🗄️   └── campusMap/          # HTML, CSS, JS for the map interface
🗄️       ├── campus_map.html
🗄️       ├── style.css
🗄️       ├── find_classroom.html
🗄️       ├── find_doctor.html
🗄️       ├── find_session.html
🗄️       ├── lookup.js
🗄️  └── lost&found/
🗄️       ├── images/
🗄️       ├── found_form.html
🗄️       ├── lost_form.html
🗄️       ├── main.html
🗄️       ├── match-result.html
🗄️       ├── found.js
🗄️       ├── lost.js
🗄️       ├── script.js
🗄️       ├── style.css
🗄️  ├── partnerFinder/
🗄️       ├── availability_update.html
🗄️       ├── availability.js
🗄️       ├── partner_finder_home.html
🗄️       ├── partner_finder.css
🗄️       ├── partner_finder.js
🗄️       ├── update_profile.css
🗄️       ├── update_profile.js
🗄️       ├── update_skills_interests.html
🗄️       ├── findpartnerQ.png
🗄️       ├── partnerFound.png
🗄️       ├── searching.png

📁 .env                    # Environment variables
📁 .gitignore              # Node modules & .env
📁 README.md
```

---

### ⚙️ Installation & Setup

1. Clone the repo

   ```bash
   git clone https://github.com/your-team/UniConnect.git
   ```

2. Setup the backend

   ```bash
   cd Backend
   npm install
   ```

3. Create a `.env` file in the backend root with:

   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASS=
   DB_NAME=uniconnect
   JWT_SECRET=yourSecretKey
   PORT=5000
   ```

4. Start MySQL (via XAMPP or other), and create the database:

   ```sql
   CREATE DATABASE uniconnect;
   ```

5. Run the backend server:

   ```bash
   node server.js
   ```

6. Open `Frontend/*.html` files directly in your browser.

---

### ✅ To Do

* [x] Login/Register
* [x] Doctor/Classroom/Session Lookup
* [x] Database setup via Sequelize
* [ ] UI enhancements
* [ ] Deploy to hosting platform (e.g., Render or Vercel)

---

### 👩‍💼 Team

* 👨‍💻 Jana Adel – Backend, Authentication, Databse & API Integration 📧 Janaadel2000@gmail.com
* 👩‍💻 Nour Nasr – Partner Matching                                   📧 nour.nasr129@gmail.com
* 👨‍💻 Shahd Sherif – Lost & Found                                    📧 shahddsheriff@gmail.com
* 👨‍💻 Laila sherif – Frontend UI & Map                               📧 lailakassem03@gmail.com

---

### 📘 License

MIT License. Free for personal or academic use.
