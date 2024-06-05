# Convo-Cove

## Table of Contents
* General Info
* Features
* Technologies
* Technology Stack
* Live Demo
* Testing
* Requirements Fulfillment
* Architectural Compliance
  
## General Info
ConvoCove is a real-time chat application facilitating private and group conversations with others. The system leverages React for building a responsive user interface and Firebase for backend services, including authentication, data storage, and real-time updates

## Features

Real-time Chatting: Send and receive messages in real time. Whether it’s a private conversation or a group discussion, you’ll never miss a beat.

Group Conversations: Create group chats to communicate with multiple users at once. Ideal for team collaborations, family chats, and more.

Private Conversations: Have one-on-one conversations with other users. All chats are private and secure.
User Authentication: Register and log in to your account securely with Firebase authentication.

## Technologies

Create-React-App

Firebase

React-router-dom

Styled components

Ant Design

Netlify

## Technology Stack

Frontend: The user interface is built using React, a popular JavaScript library for building user interfaces. React’s component-based architecture allows for a modular and maintainable codebase.

Backend: Firebase, a comprehensive app development platform, is used for backend services. It provides solutions for authentication, real-time databases, and cloud storage, among others.

## Live Demo

https://main--dancing-kelpie-62e069.netlify.app

## Testing

Our tests cover the following aspects:
- Unit tests for individual components
- Integration tests for combined components

## Requirement Fulfillment

We have made an effort to fulfill all requirements as outlined in the Software Requirements Specification (SRS). Here are some key points:

**Performance Requirement**: The application should be capable of supporting up to 10 concurrent users without any degradation in performance, a requirement that ensures the application can handle multiple users simultaneously, a common scenario in group chats.

**Safety Requirement**: The application must authenticate users before allowing them access to their accounts, a measure that prevents unauthorized access and protects user data.

**Security Requirement**: The application is designed with a strong emphasis on data privacy and security, ensuring that user data is encrypted during both transmission and storage. It is committed to not sharing user data with third parties without explicit user consent.

## Architecture Compliance

We have adhered to the architectural design specified in the Software Design and Architecture Document (SDAD). Here are some highlights:

**Usability**: In order to maintain our focus on usability and iterate smoothly on our user interface, we will be using React and Firebase to ensure the operation of the database to store the chat history and any other available data that are transmitted from the user input. 

**Availability**: ConvoCove developed a strong database, ensuring that resources can be allocated to provide increasing user demands. Additionally, the monitoring and maintenance further support availability, and allow ConvoCove to execute and address any arising issues to ensure continuous service.

**Maintainability**: To facilitate seamless updates and enhancements, the architecture uses the practice of code organization and documentation. Components and services are modularized to promote reusability and independent development, boosting the response to changing environments. 

**Testability**: The platform employs comprehensive testing strategies such as unit tests and integration tests. Unit tests verify the behavior of individual components and services. Integration tests validate the interaction between different layers of architecture. Mock data and simulated environment replicate real work scenarios and allow testing under controlled consciousness. 


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

