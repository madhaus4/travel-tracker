# Rovewind Tours
A travel application for users looking for a private, no-fuss booking experience. 

---

[Summary](#summary) |
[Tech Used](#tech-used)
[Getting Started](#getting-started) |
[Current Features](#current-features) |
[Future Features & Noteworthy Limitations](#future-features-&-noteworthy-limitations) |
[Preview](#preview) |
[Reflection](#reflection) |
[Contributors](#contributors) |
 
---

### Summary
Each time a user visits the Rovewind Tours page, they will be asked to login.  Upon successful login, the user will be welcomed to the travel application.  The main page view is a place where a user can select their next adventure including the start date, the end date, how many guests and of course the destination they'd like to visit.  A notification will then pop up letting the user know an estimated cost, all in, for the trip.  If they're still interested, there's a button there to request further information from a travel agent.  From there the user can scroll through the page which is sectioned up into four areas; Curent Trip Details, Pending Trips, Upcoming Trips, and Past Trips.  When a new trip is requested and waiting to be approved by the travel agent, it will appear in the pending section.  
 
### Tech Used
JavaScript | SCSS/CSS | HTML5 | Mocha | Chai | Webpack | WebAPIs

---
### Getting Started
1. Clone down the [Travel Tracker API](https://github.com/turingschool-examples/travel-tracker-api)
2. Then ```cd``` into the directory
3. Run ```npm install```
4. Run ```npm start```
5. Clone down this repo [Rovewind Tours]() outside of the API directory
6. Then ```cd``` into the directory
7. Run ```npm install```
8. Run ```npm start```
9. Paste this: ```http://localhost:8080/``` into your browser
10. <strong>To Login: Your username is ```traveler[your id here]``` &Your password is ```travel```</strong> 


[Return to top](#rovewind-tours)

### Current Features
- A user dashboard to request trip pricing for a specific destiation.  The price includes the round trip flight, the estiated cost of lodgind per day, the duration of the trip, how many guests and the travel agent's fee.
- A user dashboard to view all their trips; Current Trip, Pending Trips, Upcoming Trips, and Past Trips.
- A user login page to gain access to specific-to-them data.
- Ability to view from mobile to desktop devices.

### Future Features & Noteworthy Limitations
- Currently, there is no Travel Agent login.  Therefore, any trip the user requests, will live in 'pending' for the time being.  This is something I would like to add to the app to make it more functional for the user experience.
- The app should have a log out button and make the menu icon functioning.
- I'd really like to add a way to view all the trip options on the login page for users who are not yet members.  Additionally, set up a registration form to get new users to the app.

### Preview
![travel-tracker-mobile](https://user-images.githubusercontent.com/76507607/129066535-4a50fd09-c1ce-46d9-a135-9f18e2e95c75.png)
![recording (6)](https://user-images.githubusercontent.com/76507607/129623367-67a85de9-ccda-4ace-b7fc-0584b09f6227.gif)

[Return to top](#rovewind-tours)

---
### Reflection
- Working with the fetched data was certainly a challenge.  I found it difficult to access the data in the correct place throughout the file I imported the information too.  I ended up reworking my fetch calls and the way I set up my API file to make accessing the data more straight-forward and efficient.  
- The styling of the application was challenging as well.  Is styling ever done?  I started with the mobile layout and moved onto the desktop layout.  The main struggle was getting a horizontal scroll to work the way I wanted within the page view.  Additionally, I really wanted to implement glide.js and other libraries but I ran out of time for the scope of this project.  I think those additions would have made the UI more exciting.
<br>

- My challenges tend to become wins when I reflect on my learning and perserverance throughout projects.  I'm getting more comfortable working with APIs and I'm happy of where this project is at over all.  I'm creating good, strategic and structured habits for executing projects.  This particular project, travel tracker, was certainly overwhelming at points &considering it's my first application that resembles real world user experience with tech, I had big plans for it.  However, as a few days went by, filled with more hours than I want to admit, I realized reality for this project is not what I initially imagined.  There's SO much more I want to add/change in this application.  In the end, my code is readable and empathetic and I am proud of what I've acomplished.


[Return to top](#rovewind-tours)

---
### Contributors
[Maria DelSignore](https://github.com/madhaus4) <br>
[Natalie McIntypre](https://github.com/nataliemcintyre2021) - Reviewer <br>
[Mae Duphorne](https://github.com/maeduphorne) - Reviewer <br>
[Hannah Hudson](https://github.com/hannahhch) - Project Manager <br>

---

[Return to top](#rovewind-tours)
##### * [Find Project Spec Here](https://frontend.turing.edu/projects/travel-tracker.html)
