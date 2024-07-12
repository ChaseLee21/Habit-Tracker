# Habit Tracker

https://habit-tracker-jukt.onrender.com

## Disclaimer

This project is a passion project that was inspired by the book "Atomic Habits" by James Clear. I am in no way affiliated with nor sponsored by the author or any company he is associated with.

## About the Project

Habit Tracker is exactly what it sounds like. A way motivate myself to create new habits, track my progress, and encourage change. I wanted to apply my knowledge of full-stack web development to create something more than just a React.js youtube tutorial (no hate to youtube). I wanted to create something that I actually care about and could use in my daily life. I hope you enjoy this project as much as I enjoyed creating it. 

## About Me

My name is Chase Seeberger and I am a junior web developer just starting out in the developer world. I am mostly self taught although I have had professional education via a full stack web development bootcamp. This project has its flaws and as I continue to grow as a developer I plan on updating this project. Below is a link to my portfolio website.

- https://calm-moxie-8e318a.netlify.app/

## Technology Stack

- React
- Node
- Express
- MongoDB
- Mongoose
- Tailwind CSS
- JSON Web Token
- Matter.js

## Walkthrough

Below is a technical walkthrough of the application. This is not a user guide but a technical walkthrough of the features, my thought process of creating the project, what problems I ran into, and how I solved them.

### Login, Registration, and Authentication

Handling authentication was the first big hurdle in this project. I know what I didn't want to use a third party service or extensive authentication library. I wanted to build a system that shows I understand the basics of authentication within web applications. I decided to use json web tokens (JWT). When a user registers an account the password is hashed using node.js built in crypto package and stored in the database. When a user logs in a JWT token is generated on the sever side and gets stored in the users local browser storage. The token is sent to the server with requests that require authentication and the server uses the token to verify the users identity before sending back a response.

### Data Schema

It is impossible to talk about the habit system of the app without bringing up how the data schema is structured. I would also be lying if I said I nailed the data schema on my first try. It took several tweaks and one big redesign before I got the system working how I like it.

#### Summary / TLDR

The original design of the data schema was limited by a design that relied on daily completion of every habit. This design only allowed for habits that the user wanted to do 7 days a week. The data schema was redesigned to fix this by creating a system that allowed for habits that only needed to be completed 1-6 times a week.

#### First Data Schema

The original data schema for the app had three data types that were used to make everything happen. Users, habits, and analytics. 

The user data type stored the users basic profile data like email, username, authentication, & a reference to the users habits. 

The habit data type stored stored data such as: the name of the habit, the users goal for the habit, a reference to the analytics data type, etc. 

The analytics data type stored a date and a completed boolean. Everyday a user logged in a new analytic was created for each habit the user has on their account. The user would check off what habits they completed that day. When a habit got marked as completed a very inefficient put request was fired off marking the analytic as completed and updating the habits streak accordingly. This system kinda worked, but it was not efficient and failed in a one very important place.

#### The Problem

The first data schema only allowed for habits which users want to complete 7 days a week. For some habits it worked great such as drinking water or brushing your teeth, but lets say a user wanted to create a habit of exercising 4 days a week. Even if the user met their goal by exercising their 4 days that week their streak would be set back everyday they didn't exercise. With the structure of the data schema there was not a reliable way to keep track of a habits progress over a period of time greater than day to day.

#### The Solution

A fourth data type: 'Week'. My fix for this entire data schema problem was to add in a new data type called 'Week'. I also renamed 'Analytic' to 'Day' because it was more logical. This 'Week' data type was used to group together 7 'Day' data types in a property called 'days' as well as an 'endDate' and 'frequency' properties. With this new data schema I was able to refactor some code on the back end to fix my problem. This way a habit's streak only gets reset when the user does not complete their habit as many times as the said they would (that number being stored in the frequency property) before the end date is reached (which is set to every Sunday).

#### Bonus

A bonus feature of redesigning the data schema is that I can prompt the user at the end of the week to either raise or lower their goal for their habit based on their performance that week. This was a feature I wanted to implement when I first started envisioning this project but ran into roadblocks created by my inefficient database design. This feature was now possible with the newly structured database.


### Habits 

The habit system is pretty straight forward once the data schema was figured out. 

1. The user creates a habit using the step by step habit creator. That habit is now linked to their account. 
2. When the habit is being created the user creates a goal (defines when that habit can be marked as completed for the day) as well as a frequency (the amount of times they want to do that habit each week) and finally an emoji that will represent the habit.
3. Everyday the user logs in and marks off each habit they completed that day. Everytime a habit is completed the streak for that habit increments by 1. The emoji that represents that habit will also be added the progress page.
4. At the end of the week the app determines if the user successfully reached their frequency for the habit. If yes the app will ask them if they want to increase the goal. If no the app resets their streak and asks if they want to lower their goal.

### Progress Page

Each user has their own progress page they can view at any given time. Everytime a user marks their habit as completed the emoji that represents that habit is pushed into a string that is stored in the users data schema. When a user visits the progress page they can see every emoji that they have "earned" so far on their journey. Over time this progress page can fill up a lot. I believe this was the best way to showcase a users progress and motivate them to continue earning those emojis.

The progress page was created using matter.js. I originally tried coding this page from scratch with no library but very quickly realized I was wasting my time. Matter.js is a robust 2d physics engine library and I highly reccommend checking it out if you ever want to code physics using javascript.

