<html>
    <body>
        <?php
            ## Basic Arithmetic
            // Add function
            function addFunc(int|float $num1, int|float $num2) : int|float
            {
                $result = $num1 + $num2;
                return $result;
            }

            // Subtraction function
            function subtractFunc(int|float $num1, int|float $num2) : int|float
            {
                $result = $num1 - $num2;
                return $result;
            }

            // Division function
            function divideFunc(int|float $num1, int|float $num2) : int|float
            {
                $result = $num1 / $num2;
                return $result;
            }

            // multiply function
            function multiplyFunc(int|float $num1, int|float $num2) : int|float
            {
                $result = $num1 * $num2;
                return $result;
            }

            ## Scientific function
            // Sine function
            function sinFunc(int|float $num1) : float
            {
                $angle = deg2rad($num1);

                return sine($angle);
            }

            // Cosine function
            function cosFunc(int|float $num1) : float
            {
                $angle = deg2rad($num1);

                return cosine($angle);
            }

            // Tan Function
            function tanFunc(int|float $num1) : float
            {
                $angle = deg2rad($num1);

                return tan($angle);
            }

            // Power Function
            function powFunc(int|float $num1, int|float $exponent) : int|float
            {
                return pow($num1, $exponent);
            }

            // Square root function
            function sqrtFunc(int|float $num1) : int|float
            {
                return pow($num1, 2);
            }

            // Cube root function
            function cubeFunc(int|float $num1) : int|float
            {
                return pow($num1, 3);
            }

            // Implementation
            $operator = '';
            $num1 = '0';
            $num2 = '0';
            $result = (int) $num1; // Calculator's default answer and starting number
        ?>
    </body>
</html>