# Technical Growth Assessment

**Deadline: W7D6 12PM** 

## Format
```plaintext
I am your project manager. I want to create a real-time messaging company much like Slack. 

This prompt is intentionally left vague as these are the types of instructions you may receive in the real-world.

It is up to you to ask GOOD, clarifying questions. 
```

## Objective
### Clone Slack
- Implement a real-time chat application with a:
	- well thought out, scalable system
	- logical and optimized schema design
	- responsive && intuitive UI/UX
- Employ best practices whenever possible:
	- modular code
	- well-secured application
	- well thought out folder structure
- No restrictions on frameworks
	- Be prepared to explain your choices though!
	- Ex: React vs Angular vs Backbone

## Bare Minimum
1. Schema Design
	- Flesh out your tables and the relationships
	- Tables to consider: 
		- Teams
      - Users
      - Channels
      - Messages
      - Attachments
      - Stars
      - Reactions
      - Comments
2. System Design
3. Create a RESTful API
	- You do not need to support every type of request, just whatever is pertinent to the application
4. Integration tests for each component in your back end
	- Jest is a solid option! But explore Mocha/Chai, Jasmine, etc. 
	- You may not proceed until you write tests for each component
	- You may need to refactor some tests to accommodate certain features
5. Authentication system
	- Using Passport.js, bcrypt
	- Utilize the local strategy
		- Look into the `next()` function in Nodejs!
6. Create a socket server
	- Socket.IO
	- Mimic the functionality of Slack
		- Does not have to be exact
		- Please ask me to define 'done'
7. Design a responsive UI much like Slack
	-  Wireframes are provided by Slack's web app.
8. Deploy onto AWS EC2
	- I recommend an Ubuntu instance
		- HINT: Your goal is to install Nodejs onto the deployed Ubuntu instance

## Above and Beyond
1. Write tests for your front end code
2. Allow users to login with Google or Github
3. Secure your routes
	- Using jsonwebtoken (jwt)
		- Look into the `next()` function in Nodejs!
4. Validate your forms
	- Look into JOI! 
  - You may have to look into regex
5. Allow users to save custom emojis - store the files in AWS S3
6. Use a hosted database, either AWS RDS or AWS Dynamo
7. Secure your app with SSL
8. Use nginx as a web server to serve your static files and proxy requests!
9. Stress test your system
	- Look into artillery.io!

## God Mode
1. Port your Slack Clone to Electron

## Expectations

1. Clear concise instructions on how to start the app
	- Detail the commands I need to start my app.
	- Ensure there are no bugs when attempting to start the app.
	- I wholly expect the app to start with no problems. I should not have to debug.
2. Functional RESTful API - able to hit endpoints and retrieve data. 
	- There should be a command where I can run tests against the API!
		- Mostly expecting integration tests!
3. Achieve Slack-like functionality
	- It doesn't have to be the most scalable and perfect implementation
	- I should be able to do the following:
		- Create a Slack Team
		- Invite users to my Slack Team
		- Create channels within my Slack Team
		- Send messages to specific channels
		- Direct Message users
		- Toggle between the channels and DMs
4. UI/UX should mirror Slack's Web App
	- Again, I am not expecting perfection
	- Use your best judgment on what looks sufficient


## W7D6
There will be a 30 minute discussion of the application.

OR

We will send an email Sunday afternoon
