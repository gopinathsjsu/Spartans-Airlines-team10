# Spartans Airlines - Team 10

# Team Members:
Divya Mohan <br>
Saurabh Vijaywargia <br>
Shakthivel Ramesh Nirmala <br>
Shravan Vallaban <br>

# Technology Stack:
* Frontend - ReactJS, Redux
* Backend - ExpressJS
* Database - MongoDB
* Cloud - AWS
* Load Balancer - AWS Elastic Load Balancer
* Postman - API Testing
* Project Management Tools:  
   * GitHub - Source code and Project Management
   * Google Sheet - Tracking tasks and sprint burndown charts
   * Zoom - Team collaboration (Organizing daily scrum meetings)

# Architechture Diagram:

<p align="center">
	<img width="900" src="https://user-images.githubusercontent.com/77031080/143789168-cf8b0fda-afee-47f0-b891-c3ad099c5a53.png">
</p>

# UI Wireframes:
<p>
	<img height="400" width="700" src="https://user-images.githubusercontent.com/77031080/143789346-ccea2995-c456-494a-a616-295056e4efbc.png">
</p>
<p>
	<img height="400" width="700" src="https://user-images.githubusercontent.com/77031080/143789467-6f78e2aa-85bf-4e29-860f-c3321fcd472f.png">
</p>
<p>
	<img height="400" width="700" src="https://user-images.githubusercontent.com/77031080/143789494-79ec5397-1214-44e8-856e-5bcec5c2a9f7.png">
</p>
<p>
	<img height="400" width="700" src="https://user-images.githubusercontent.com/77031080/143789551-af2d07aa-a277-43ce-b12b-eaf5e7e0400e.png">
</p>
<p>
	<img height="400" width="700" src="https://user-images.githubusercontent.com/77031080/143789591-17499473-46ad-4b99-99cb-2d5c9067fdf8.png">
</p>
<p>
	<img height="400" width="700" src="https://user-images.githubusercontent.com/77031080/143789620-9168f455-af25-455c-9339-396bc7ce81bd.png">
</p>
<p>
	<img height="400" width="700" src="https://user-images.githubusercontent.com/77031080/143789647-044f75d1-4255-44f2-a509-d4d0b83e2d18.png">
</p>
<p>
	<img height="400" width="700" src="https://user-images.githubusercontent.com/77031080/143789683-73e07f8b-ef89-439f-8a41-eea7a8437c64.png">
</p>
<p>
	<img height="400" width="700" src="https://user-images.githubusercontent.com/77031080/143789664-56fb448d-d00f-4ea7-af33-0a433bec0ba7.png">
</p>

# Deployment Diagram:

# Design Decisions:

* ***Database : Why NoSQL?*** 

   * In general we chose NoSQL because they support their own access languages that can interpret the data being stored, rather than require a relational model within the underlying database.
   * This more developer-centric mentality to the design of databases and their access application programming interfaces (API) are the reason NoSQL databases have become very popular among application developers.
   * Application developers don’t need to know the inner workings and vagaries of databases before using them.
   * NoSQL databases, in general, helps developers to work on what is required in the applications instead of trying to force relational databases to do what is required.

* ***Database : Why MongoDB over other NoSQLs?***

   * We chose MongoDB over other NoSQL databases because they easily support multiple levels of nested data unlike others where you have define the structure and type while creating the table.
   * When compared to Cassandra, Mongo allows us to choose secondary indexes along with the flexibility in the data model.
   * Unlike any other NoSQL DB Mongo is Schema-less, we don't have to define the schema in the beginning and it also allows the developers to change the schema dynamically

* ***Choosing Server-side Framework: Why Node JS over Flask?***

   * While Flask is complete backend framework based on python, Node JS is a full-stack framework based on javascript. Although one could develop backend of the web application in Flask, the UI of the application is commonly devloped in javascript and it makes sense to develop the server-side script in javascript as well since it gives continuity to between the client and server sides. Also, collaboration between the UI and Server scripting teams can happen at ease with each team helping the other in debugging as well given the shared knowlegdge of the languages used.

   * Node JS embeds the Chrome V8 compiler within it and it compiles the JS code into machine language code in memory the first it is referenced therby exhibiting a just in time compilation approach. Chrome V8 compiled machine code executes faster than python compiled byte code

   * It has been found that when medium-load applications written separtely in python as well as Node are deployed on a docker container and tested with a load testing application, the application written in python was twice as slow as the Node.js service.

   * The throughput of the applications written in python is also at least 10% lower than that of Node.js service.

   * All these factors combined implied that we would be better served if we design the server side in Node.js

* ***Client-side scripting: Why React JS?***

   * It is no-brainer to choose Javascript over any other client side scripting language given the overwhelming popularity amongst the developer community and also the number of libraries and frameworks, but choosing amongst React and Angular was something that needs to paid attention to

   * React uses Virtual Dom, whereas Angular uses a traditional Dom.

   * Now, in traditional Dom, if you want to update specific information of your user, Angular will rewrite the whole structure of the Html Tree. Whereas, React Virtual Dom allows you to update the changes without rewriting the entire HTML/ In short, React Virtual Dom is faster than the Angular Traditional Dom.

   * React Uni-directional data flow ensures that the state change takes place meticulously even in complex projects. Data flow control is very simple in react even for large projects.

   * Opposite to React's uni-directional nature, Angular's Bi-directional data flow makes it even complex for large applications to deal with data quickly.

   * Thus the clear winner was React amongst the two and we chose it for our application.

*  ***Express JS***
   
   * Express is used for defining routes of a web application based on HTTP methods.

   * Provides us a lot of middleware modules to performing validation and sanitization

   * We can also define error handling using the middleware provided by Express.


# Application Screenshots:

# AWS Load Balancers Screenshots:

# GitHub Repo Link:

https://github.com/gopinathsjsu/Spartans-Airlines-team10

# Scrum Meeting Schedule:
Wednesday  <br>
Friday

# Weekly Scrum Report:

# Project Dashboard:

# Task Sheet & Burndown charts:

# Areas of contribution:
* We divided our work as two categories, Frontend and Backend application development:

   * Frontend Application design, implementation and deployments - Shakthivel Ramesh Nirmala and Saurabh Vijaywargia
   * Backend Application design, implementation and deployments - Divya Mohan and Shravan Vallaban

# Extreme programming (XP) Core Values Implemented:
 * Communication
    * Communication was one of the key strengths of our team. Our team managed to meet every week on Wednesday and Friday for the scrum.
    * During the meeting, we discussed about individual progress, technical difficulties and we helped each other whenever there was a roadbloack. We ensured that there was knowledge transfer from one person to the rest of the team.
    * We used GITHUB project board to plan our product backlog items. This helped us to analyse our team's sprint capicity and plan accordingly for all our future sprints.
    * By incorporating unfettered communication, we eliminated major pitfalls at earlier stage of development and increased our overall productivity.

  * Simplicity
    * We ensured to incorporate only the simplest things that worked.
    * We have made our code modular and re-usable so that everyone in the team could understand the code and make changes in the future if needed.
    * We have minimised the code smells as much as possible and added relevant comments in our code.
    * Our code base is simple hence easy to maintain
  
  * Feedback
       * Constructive feedback gave us a healthy environment for interaction and conveying our thoughts more transparently.
       * By giving and receiving regular feedbacks, we were able learn, adapt to the changes and avoid recurring mistakes. This motivated us to perform more efficiently.
       * During the development phase we pushed our changes to a branch and created pull requests. Once the code was approved by another team member, we pushed the changes to the master branch. We made sure the code changes on the master branch was always stable and did not break the other team member’s code.
       * Continuous feedback helped us in aligning our goals and responsibilities.










