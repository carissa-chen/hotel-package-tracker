# Hotel Packing Tracker

Hotel Packing Tracker is a mobile application designed to help hotel front desk staff log, organize, track, and retrieve packages delivered for hotel guests.

## Contributors
- Zachary Soriano - Problem Framer
- Carissa Chen - Solution Framer
- Mehla Abebe - Front End and Experience
- Julian Saquic - Back end and Verification 

## About

Hotels often receive packages for many different guests and rooms. Some hotels still use handwritten logs, which can lead to incorrect entries, lost records, misplaced packages, and difficulty locating deliveries.

Hotel Packing Tracker replaces handwritten package logs with a digital system that makes package management faster and more reliable.

## Features

* Log incoming guest packages
* Store guest names and room numbers
* Record tracking numbers, delivery dates, and times
* Scan package labels using a device camera
* Search packages by guest name, room number, delivery date, or tracking number
* Sort package records
* Update package information
* Collect confirmation signatures during pickup
* Mark packages as retrieved
* Require employee login
* Store package records in a database

## How It Works

1. A package arrives at the hotel.
2. A staff member logs the package in the app.
3. Package information can be entered manually or scanned from the shipping label.
4. The package is assigned to the correct guest and room and stored for pickup.
5. Staff can search for the package when the guest arrives.
6. The guest signs to confirm that they received the package.
7. The package is marked as retrieved.

## Intended Users

* Hotel front desk employees
* Hotel staff responsible for packages
* Hotel guests receiving deliveries

## Technology

The final technology stack is still under consideration.

### Current Stack

- **Frontend:** JavaScript, React, Vite, and CSS
- **Backend:** Node.js and Express
- **Database:** MongoDB with Mongoose
- **Testing:** Jest and Supertest
- **Version control and CI:** GitHub and GitHub Actions

### Planned Technologies

* Mobile application
* Relational database
* Camera/OCR label scanning
* User authentication
* Cloud hosting
* GitHub for version control
* CI/CD deployment pipeline

## Project Structure

```text
hotel-package-tracker/
├── src/                 # React frontend and supporting code
├── models/              # Mongoose package model
├── routes/              # Express package routes
├── tests/               # Automated API tests
├── docs/                # Project diagrams and documentation
├── .github/workflows/   # GitHub Actions test workflow
├── app.js               # Express app configuration
├── server.js            # MongoDB connection and backend server
├── vite.config.js       # Vite configuration
├── package.json         # Dependencies and npm scripts
└── README.md
```

> The project structure may change as development continues.

## Installation

Install Node.js and npm. You also need a running MongoDB server or a MongoDB connection string.

From the project directory, install dependencies:

```bash
npm install
```

By default, the backend connects to `mongodb://localhost:27017/hotel-tracker`. To use another database, set the `MONGO_URI` environment variable before starting the backend.


## Usage

Once completed, hotel employees will log in to the application and use the main package management screen to:

* Add packages
* Search packages
* Update package information
* Record pickups
* View package status

## Testing

The project will include testing for important functions such as:

* Package creation
* Guest and room assignment
* Package searching
* Package sorting
* Label scanning
* Package updates
* Signature collection
* Package retrieval
* User authentication

The project uses Jest and Supertest for automated API tests. The current tests check that the package endpoint:

- Creates a package when given valid input
- Returns an error when required information is missing

The package model is mocked in these tests, so they do not test a live MongoDB connection.

Run the tests with:

```bash
npm test
```
GitHub Actions also runs the tests on pushes and pull requests to `main`.

## Project Status

**Currently in development.**

The running app supports package logging. Features described as planned have not yet been added to the running app.


## How to run

**Front end terminal** 
```
npm install
npm run dev
```
**Backend terminal**
```
npm start
```

## Future Improvements

Possible future improvements include:

* Guest package notifications
* Shipping carrier integrations
* Hotel management system integrations
* Package storage location tracking
* Administrative dashboards
* Package history and reporting

## License

A license has not yet been decided on.
