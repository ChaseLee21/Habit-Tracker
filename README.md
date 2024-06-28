# Habit Tracker

## Disclaimer

This project is a passion project that was inspired by the book "Atomic Habits" by James Clear. I am in no way affiliated with nor sponsor the author or any company he is associated with.

## About the Project

My dad was business man and always told me he named his store wanting people should know exactly what his store offered before they even entered the place. I may not be a savy business man naming a store that customers will see when driving by but I apply his advice when I can. Habit Tracker is exactly what it sounds like. A way for myself (and anyone that happens to stumble across this) to track my habits and view my progress. I wanted to apply my knowledge of full-stack web development to create something more than just a React.js youtube tutorial (no hate to youtube). I wanted to create something that I actually care about and could use in my daily life. I hope you enjoy this project as much as I enjoyed creating it. 

## Walkthrough

Below is a technical walkthrough of the application. This is not a user guide but a walkthrough of the features and how they are implemented.

### Login, Registration, and Authentication

Handling authentication was the first big hurdle in this project. I know what I didn't want to use a third party service or extensive authentication library. I wanted to build a system that shows I understand the basics of authentication within web applications. I decided to use json web tokens (JWT). When a user registers they provide an email and password. The password is then hashed using sha512 encryption (I used a node package called crypto to handle this) and stored in the database. When a user logs in a JWT token is generated on the sever side and is sent to the user's browser where it gets stored in the browser's local storage. This token is then used to authenticate the user on the server side. The token is sent to the server with every request and the server uses the token to verify the users identity before sending back a response.

## Technology Stack

- React
- Node.js
- Express
- MongoDB
- Mongoose
- Tailwind CSS
- JWT for authentication