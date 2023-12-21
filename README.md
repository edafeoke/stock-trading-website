# Stock Trading Website

This is a stock trading website developed using Express.js and Sequelize ORM with MySQL.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Folder Structure](#folder-structure)
- [Database](#database)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js: [Download Node.js](https://nodejs.org/)
- npm: Included with Node.js installation
- MySQL: [Download MySQL](https://www.mysql.com/)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/edafeoke/stock-trading-website.git
   ```

2. Change into the project directory:

   ```bash
   cd stock-trading-website
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a MySQL database and update the configuration in `config/database.js`:

   ```javascript
   module.exports = {
     development: {
       // Update your database configuration here
       dialect: 'mysql',
       host: 'localhost',
       username: 'your_username',
       password: 'your_password',
       database: 'stock_trading_website',
     },
     // ...
   };
   ```

## Usage

To start the server, run:

```bash
npm start
```

Visit [http://localhost:3000](http://localhost:3000) in your web browser.

## Features

- User authentication and authorization
- Stock trading functionality
- Admin dashboard for managing users
- Forgot password functionality
- ...

## Folder Structure

```
stock-trading-website/
|-- config/
|   |-- database.js
|-- public/
|   |-- ...
|-- routes/
|   |-- auth.js
|   |-- index.js
|   |-- admin.js
|-- views/
|   |-- pages/
|       |-- ...
|-- .gitignore
|-- .env
|-- app.js
|-- middlewares.js
|-- package.json
|-- README.md
```

## Database

This application uses Sequelize ORM with a MySQL database. Update the database configuration in `config/database.js` according to your setup.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## License

This project is licensed under the [MIT License](LICENSE).
