# csci-3308-spring22-015-01

# Project Location:
DeployedCode folder contains the current code for the project

# Project Description:
  Students are tired of having to manually build their schedules each semester. They know what classes they need to take, but having to put each lecture and recitation into their schedule individually is a big waste of their time. The new CU Scheduler will help do away with that problem. All you have to do is simply add all of the classes you want to take to your shopping cart, press go, and the CU Scheduler will automatically create multiple schedules for you. From there, you can pick the schedule that works best for you.
  The CU Scheduler will grab the information for CU classes from the classes.colorado.edu website and use that information to help build a user’s schedule. To start, the scheduler will make sure that each class is at least fifteen minutes before the next, in order to prevent classes from being scheduled too close together.


# Architecture Overview:
  On the backend, we will be using PostgreSQL and NodeJS. Our backend web server will be built with NodeJS, and databases for schedule and login information will be built with PostgreSQL.
  On the frontend, we will be using JavaScript, CSS, and HTML for our user interface and display options. We will also use Python to pull information the CU Schedule.
