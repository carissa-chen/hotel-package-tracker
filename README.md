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

* **Frontend:** React Native
* **Backend:** Node.js
* **Database:** MySQL *(tentative)*

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
Hotel-Packing-Tracker/
├── src/
├── tests/
├── docs/
├── README.md
└── .gitignore
```

> The project structure may change as development continues.

## Installation

Installation instructions will be added once the development environment and technology stack are finalized.

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

## Project Status

**Currently in development.**

The project is currently focused on requirements, system design, database planning, and implementation of the main package tracking features.

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
