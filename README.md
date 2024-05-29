# Game Management

This is a project to manage games. It's a Node.js application that uses MongoDB as a database and provides an API for managing games.

## Installation

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install the project dependencies by running `npm install`.
4. Copy the `.env.example` file and rename the copy to `.env`.
5. Update the `.env` file with your environment variables:
  - `MONGODB_URI`: The URL of your MongoDB database. The default is `mongodb://localhost:27017/game-management`.
  - `PORT`: The port your application should run on. The default is `3000`.
  - `SECRET_KEY`: Your application's secret key. Replace `"mysecretkey"` with your actual secret key.
  - `EMAIL_USER` and `EMAIL_PASS`: The credentials for the Nodemailer email service. Replace the empty strings with your actual credentials.

## Usage

1. To start the application in development mode, run `npm run dev`.
2. To build the application for production, run `npm run build`.
3. To start the application in production mode, run `npm start`.
4. To check the code for linting errors, run `npm run lint`.
5. To automatically fix linting errors, run `npm run lint:fix`.
6. To check the code formatting with Prettier, run `npm run prettier`.
7. To automatically fix code formatting with Prettier, run `npm run prettier:fix`.

The application comes with a default admin account. Use this account to manage games.

## API Documentation

For more details on how to use the API, please refer to our [Postman documentation](https://elements.getpostman.com/redirect?entityId=18242201-f4f00979-51cd-486c-a17b-e918e51387ec&entityType=collection).

## Contributing

Contributions are welcome. Please fork the repository and create a pull request with your changes.

## License

Include information about your project's license here.