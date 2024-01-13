# Habit Tracker
A habit tracker app created using NodeJs, Express, EJS, and MongoDB.

## Folder Structure:
.<br>
├── config<br>
│   └── mongoose.js<br>
├── controllers<br>
│   ├── dashboard_controller.js<br>
│   ├── habits_controller.js<br>
│   ├── home_controller.js<br>
│   └── users_controller.js<br>
├── index.js<br>
├── models<br>
│   ├── Habit.js<br>
│   └── User.js<br>
├── package.json<br>
├── package-lock.json<br>
├── public<br>
│   ├── css<br>
│   ├── images<br>
│   │   ├── favicon.png<br>
│   │   ├── login.png<br>
│   │   └── logo.png<br>
│   └── js<br>
├── README.md<br>
├── routes<br>
│   ├── dashboard.js<br>
│   ├── habits.js<br>
│   ├── index.js<br>
│   └── users.js<br>
└── views<br>
    ├── dashboard.ejs<br>
    ├── home.ejs<br>
    ├── layout.ejs<br>
    ├── login.ejs<br>
    ├── partials<br>
    │   ├── _error_messages.ejs<br>
    │   ├── _habits.ejs<br>
    │   └── _navbar.ejs<br>
    └── register.ejs<br>
    
 ## To run this locally:
 ### Clone this repo: 
 git clone https://github.com/wsuyash/habit-tracker.git
 ### Into the habit-tracker directory:
 #### Open a terminal and download the dependencies:
 npm install
 #### Run the app on localhost:
 npm start
 
 The app should be running at localhost:8000
