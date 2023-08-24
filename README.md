# CSC-415-CALCULATOR

This is a simple calculator web application that allows users to perform basic arithmetic operations, exponentiation, and scientific calculations. The application includes both front-end and back-end components.

## Features

- Basic arithmetic operations: addition, subtraction, multiplication, and division.
- Exponentiation: raise a number to a specified power.
- Scientific functions: sine, cosine, tangent, square root, and cube root.
- Result history: store calculation results in a MySQL database for later retrieval.
- Responsive design: the application is optimized for various screen sizes.

## Technologies Used

- HTML5: Markup language for creating the structure of the web application.
- CSS3: Stylesheets for visual layout and design.
- Tailwind: A CSS framework for visual layout and design.
- JavaScript: Programming language for implementing interactive functionality.
- PHP: Server-side scripting language for processing form submissions and interacting with the database.
- MySQL: Relational database management system for storing calculation results.

## Installation

1. Clone the repository:

   ````bash
   git clone https://github.com/your-username/calculator-app.git
   ```

   ````

1. Set up the database:

   - Create a new MySQL database.
   - Import the `database.sql` file located in the project's root directory to create the necessary tables.

2. Configure the database connection:

   - Open the `config.php` file in the project's root directory.
   - Update the database credentials (`DB_HOST`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`) with your own database information.

3. Start the local development server:

   - If you have PHP installed, you can use the built-in development server by running the following command in the project's root directory:

     ```bash
     php -S localhost:8000
     ```

     Alternatively, you can use a local development environment like XAMPP or WAMP.

1. Open the application:

   - Open your web browser and visit `http://localhost:8000` (or the appropriate URL if you're using a different local development server).

## Usage

1. Launch the calculator application in your web browser.

2. Enter numbers and perform calculations using the provided buttons.

3. To perform basic arithmetic operations, click the number buttons, followed by an operator button (+, -, x, ÷), and then click another number button. The result will be displayed in the calculator's display.

4. To perform exponentiation, enter a number, click the "pow" button, enter the exponent, and then click the equal button (=). The result will be displayed in the calculator's display.

5. To perform scientific calculations, enter a number and click the corresponding scientific function button (sin, cos, tan, sqrt, cube). The result will be displayed in the calculator's display.

6. To view the result history, click the "History" button. The application will retrieve and display the previously stored calculation results from the database.

7. To clear the display and start a new calculation, click the "C" button.

8. To delete the last entered digit or operator, click the "Del" button.

9. To exit the application, simply close the browser window.

## Future Enhancements

- Add additional scientific functions such as logarithm, factorial, and exponential.
- Implement a more advanced calculator layout with additional features like parentheses and memory functions.
- Improve the user interface and design for a more engaging user experience.
- Implement user authentication and allow users to save their calculation history for future reference.

## Contributing

Contributions to this project are welcome. If you have any ideas, suggestions, or bug reports, please open an issue or submit a pull request.

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for more details.

## Acknowledgments

- The calculator application is based on the [CSC-415-CALCULATOR](https://github.com/Demiladeala/CSC-415-CALCULATOR) project by [Favour Olusayo](https://github.com/OluwaFavour) and [Oluwademilade Ala](https://github.com/Demiladeala).