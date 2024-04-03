# Habit Tracker

## Overview

This project is inspired from the book "Atmoic Habits" by James Clear. My goal with this project is to build a habit tracker that implements the four main principles of the book. By following these principles, I hope to build a habit tracker that is easy to use and helps users build good habits.

1. Make it obvious
2. Make it attractive
3. Make it easy
4. Make it satisfying

## Walkthrough

### Login and Registration

The user must first create an account and login. Upon login the user will be taken to the dashboard.

### Dashboard

The dashboard is where the user can see all of their habits and their progress. Here is where the user can mark their habits as complete for the day. On first login the user will not have any habits. The user can add a habit by clicking the "Add Habit" button.

### Starting a Habit

When a user starts a habit the application will walk them through a series of steps. These steps are designed to create a habit that follows the 4 guiding principles.

1. **Make it obvious** - The user will be asked to name the habit and provide a description. This is to make the habit obvious to the user.
2. **Make it attractive** - The user will be asked why they want to start the habit. What is the reward they are seeking? This is to make the habit attractive to the user.
3. **Make it easy** - The user will be asked to set their first goal for the habit being reminded to start small as later on they will build on top of this goal.
4. **Make it satisfying** - The user will be asked to set a reward for completing the habit. This is to make the habit satisfying to the user.
5. Finally, the user will be asked to set a reminder / frequency for the habit. This is used to help keep track of the habit.

### Marking a Habit as Complete

Everyday the user is encouraged to mark their habits as complete. This is done at the dashboard by clicking the checkbox next to each habit. 
After a certain frequency of completing the habit the user will be asked to update their next goal for the habit. This is implemented to follow the principle of making the habit easy.

### Habit Skipping

In the book James Clear mentions a concept called "Don't break the chain". This concept is about building a habit streak. If the user skips a habit twice in a row they break the chain. If a user happens to break the chain they will be prompted to set an easier goal for the habit. This is to make the habit easier to complete encouraging the user to start building the habit again.

### Analytics and Progress

Each habit has a graph that shows the user their progress. This is to make the habit satisfying to the user. The user can see how they are doing and how they are progressing towards their goal. The user can also see their longest streak for each habit. The user can view this information by clicking on the habit. 

## Minimum Viable Product

The minimum viable product for this project will be met once the above features are implemented. Specifically, I want the following features to be implemented:

- User registration and login
- Dashboard to view all habits
    - Mark a habit as complete which resets every day
    - The ability to view previous days up to a week and mark habits as complete
    - The ability to click on a specific habit and it will show the habits analytics and streaks
- Add a habit
    - Name the habit and provide a clear and obvious description
    - Why do you want to start this habit?
    - Set a starting goal for the habit
    - Set a reward for completing the habit
    - Set a reminder / frequency for the habit
- Habit streaks
    - Users can see their longest and current streak for each habit
- Habit analytics
    - Users can see their history for each habit shown via a graph
- Habit skipping
    - When a user skips a habit twice in a row they will be prompted to set an easier goal for the habit
- Habit Settings
    - Users can edit the habit name, description, goal, reward, and frequency
    - Users can delete a habit

## Data Schema

### User

```json
{
    "id": "string",
    "email": "string",
    "password": "string",
    "habits": "array"
}
```

### Habit

```json
{
    "id": "string",
    "name": "string",
    "description": "string",
    "why": "string",
    "goal": "number",
    "reward": "string",
    "frequency": "string",
    "streak": "number",
    "longestStreak": "number",
    "analytics": "array"
}
```

### Analytics

```json
{
    "date": "string",
    "completed": "boolean"
}
```

## Technology Stack

- React
- Node.js
- Express
- MongoDB
- Mongoose
- Tailwind CSS
- JWT for authentication
- Chart.js for analytics

## Deployment

The application will be deployed on Heroku. The database will be hosted on MongoDB Atlas.
