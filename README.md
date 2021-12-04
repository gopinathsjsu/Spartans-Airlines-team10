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

![Deployment Diagram](https://user-images.githubusercontent.com/23494069/144701112-95b6c2ed-b18e-4996-9902-fcfbee2070c6.png)

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

* ***REST over GraphQL***
   
   *  Error handling in REST is easier when compared to GraphQL. RESTful APIs follow the HTTP spec with regards to resources and returns various HTTP statues for various API request states. GraphQL, on the other hand, returns the 200 Ok status for every API request, including for errors. This makes it difficult to manage errors and makes it hard to integrate with monitoring tools.

   *  Depending on how you choose to write or generate your schemas, static schemas could become a problem when you have a changing data model because the response the clients are going to get depends on the schema definition and the query they make

* ***MongoDB Hosting***
   
   *  We have created a database instance on a cluster in MongoDB Atlas deployed int the region N. Virginia(us-east-1)

   *  We have also created a 3 node replica set for the main database instance amongst which there are two secondary members and both the secondary members can become primary in an election.

   *  Although AWS provides us virtual private cloud to manage MongoDB Atlas we had decided to host it on MongoDB since this application does not the require the scale of a equivalent production level application that has to log large amounts of data.

* ***Elastic Load Balancer***
   
   *  We are using AWS' Elastic Load Balancer to automatically distribute the incoming traffic across multiple targets such as containers and IP addresses.

   *  We have created two subnets with two availability zones for the ELB

   *  Since we are not using HTTPS or SSL for our application we have not enabled them for the load balancer. 

   *  As far as the health checks are concerned we have made sure that after 3 consecutive health checks observing the normal functioning of the EC2 instances, they will be branded healthy.

   * We are also adding the EC2 instances for the load balancer to handle the traffic and re route them to those instances.

* ***AWS and Google Cloud Platform***
   * Although the entire application can be hosted on just one cloud platform we chose to deploy the react server on a compute engine in Google Cloud Platform and the backend node server on AWS EC2 instance to test the working on an application deployed on different platforms. 

   * The configuration for the EC2 instance we had used for hosting the node server is 
      __OS__ Amazon Machine Image Ubuntu 18.04 
      __RAM__ 1 GB
      __vCPUs__ 1
      __ROM__ Elastic Block Store
   
   * We have also deployed the react server on a compute engine the configuration of which are
      __OS__   Ubtuntu 20.04
      __RAM__ 0.5 - 8 GB
      __vCPU__ 2-32
      __Processor__ Skylake

# Feature Set
   
### ***Employee/Admin***
__Login__

   While the registration of an Admin is done using a backend API which is not exposed in the User Interface since we did not want it be accessed by anyone and just be restricted the employees/admin associated with the system, the Admin can login to the Reservation system using the employeeLogin API.

__Add Flights__

   An admin can add a flight to the booking system using the addFlights API which is one of the core functionalities of the Admin

__Cancel Flight__

   An admin can also cancel any flight if the flight has no active reservations using the cancelFlight API

__Edit Flight__

   An admin can edit the price and the mileage points associated with a particular flight using the editFlight API
### ***Customer*** 
__Sign up__

   A customer can register themselves into the Spartan Airlines portal which is enbled by the signup API associated with actor customer

__Login__

   If a customer has an account with the portal they can login to the portal and view their dashboard using the login API

__Search Flight__

   If a customer has a active session with the portal they can search for flights using the searchFlights API which will give the list all the flights in which they can make a reservation

__Make Reservation__

   A customer make reservations for multiple passengers in a single reservation made possible by the reservation API

__Change Seat__

   If a customer has a active reservation they change their existing seat from the list of available seats from the same website using changeSeat API

__Cancel Booking__

   A customer can also cancel the active reservation using the cancelReservation API which will release all the seats that were held by the passengers of that reservation

__View Booking History__

   A customer can also change view all the reservations they have made using their account with getAllReservations API

__Edit Profile__

   A customer can also edit the contents of the their profile which has been done using the PUT API for the profile endpoint

__View Profile Details__

   A customer can view their profile details on the profile page which has been done with the help of a GET API on the profile endpoint.


# Application Screenshots:



# AWS Load Balancers Screenshots:

![image](https://user-images.githubusercontent.com/77031080/144661860-f316dc50-8a50-4e08-94aa-7b4499eb40a1.png)





![image](https://user-images.githubusercontent.com/77031080/144661775-2c7d8200-f67d-4ff4-b278-9600be8b82a7.png)




![image](https://user-images.githubusercontent.com/77031080/144677457-b907d9bd-b0f2-4253-9718-bf25f0dda23d.png)



# GitHub Repo Link:

https://github.com/gopinathsjsu/Spartans-Airlines-team10

# Scrum Meeting Schedule:
Wednesday  <br>
Friday

# Weekly Scrum Report & Burndown charts:

https://github.com/gopinathsjsu/Spartans-Airlines-team10/blob/main/Documents/Weekly%20Scrum%20Report.xlsx

# Project Dashboard:

![image](https://user-images.githubusercontent.com/77031080/144716412-1751eada-c2b3-4da5-8321-19045fa0be03.png)


# Sprint Journal:

https://github.com/gopinathsjsu/Spartans-Airlines-team10/blob/main/Documents/Sprint%20Journal.xlsx

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










