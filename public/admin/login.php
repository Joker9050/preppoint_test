<?php session_start(); ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Secure Login</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        primary: '#0A5EB0',
                        'primary-dark': '#084B8F',
                    }
                }
            }
        }
    </script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
    <link rel="stylesheet" href="assets/css/login.css" />
</head>
<body class="bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen flex items-center justify-center p-4">
    <div class="w-full max-w-md">
        <!-- Login Form -->
        <div id="loginForm" class="bg-white rounded-xl shadow-xl p-8">
            <div class="text-center mb-8">
                <div class="floating inline-block mb-4">
                    <i class="fas fa-user-shield text-6xl text-primary"></i>
                </div>
                <h1 class="text-3xl font-bold text-gray-800">Portal Login</h1>
                <p class="text-gray-600 mt-2">Enter your credentials to access the portal</p>
            </div>

            <form id="login-form" method="POST" action="actions/login-handler.php">
                <!-- Email Input -->
                <div class="mb-4">
                    <label for="email" class="block text-gray-700 text-sm font-medium mb-2 flex items-center">
                        <i class="fas fa-envelope mr-2 text-primary"></i> Email Address
                    </label>
                    <div class="relative">
                        <input type="email" id="email" name="email" required
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
                            placeholder="your@email.com" />
                        <div id="email-error" class="hidden absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <i class="fas fa-exclamation-circle text-red-500"></i>
                        </div>
                        <p id="email-error-message" class="hidden text-red-500 text-xs mt-1"></p>
                        <p id="email-valid-message" class="hidden text-green-600 text-xs mt-1">
                            <i class="fas fa-check-circle mr-1"></i> Email verified
                        </p>
                    </div>
                </div>

                <!-- Password Input -->
                <div class="mb-6">
                    <label for="password" class="block text-gray-700 text-sm font-medium mb-2 flex items-center">
                        <i class="fas fa-lock mr-2 text-primary"></i> Password
                    </label>
                    <div class="relative">
                        <input type="password" id="password" name="password" required
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
                            placeholder="••••••••" />
                        <button type="button" id="togglePassword" class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 transition-colors">
                            <i class="far fa-eye"></i>
                        </button>
                        <div id="password-error" class="hidden absolute inset-y-0 right-8 flex items-center pr-3 pointer-events-none">
                            <i class="fas fa-exclamation-circle text-red-500"></i>
                        </div>
                        <p id="password-error-message" class="hidden text-red-500 text-xs mt-1"></p>
                    </div>
                </div>

                <!-- Remember Me & Forgot Password -->
                <div class="flex items-center justify-between mb-6">
                    <div class="flex items-center">
                        <input id="remember" type="checkbox" class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded cursor-pointer transition" />
                        <label for="remember" class="ml-2 block text-sm text-gray-700 cursor-pointer hover:text-gray-900 transition-colors">Remember me</label>
                    </div>
                    <!-- <a href="#" class="text-sm text-primary hover:text-primary-dark transition-colors font-medium">Forgot password?</a> -->
                </div>

                <!-- Submit Button -->
                <button type="submit" id="loginButton"
                    class="glow-on-hover w-full bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white font-medium py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-300 transform hover:scale-[1.02] shadow-lg">
                    <span id="loginButtonText">Login</span>
                    <i class="fas fa-arrow-right ml-2"></i>
                </button>

                <!-- Error Message -->
                <div id="loginError" class="hidden mt-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
                    <i class="fas fa-exclamation-circle mr-2"></i>
                    <span id="loginErrorText"></span>
                </div>
            </form>
        </div>

        <!-- OTP Verification Form (Hidden Initially) -->
        <div id="otpForm" class="hidden bg-white rounded-xl shadow-xl p-8">
            <div class="text-center mb-8">
                <div class="floating inline-block mb-4">
                    <i class="fas fa-mail-bulk text-6xl text-primary"></i>
                </div>
                <h1 class="text-3xl font-bold text-gray-800">Verify Your Email</h1>
                <p class="text-gray-600 mt-2">We've sent a 6-digit code to <span id="emailDisplay" class="font-medium text-primary"></span></p>
                <p class="text-sm text-gray-500 mt-1">(Check your spam folder if you don't see it)</p>
            </div>

            <form id="otp-verification-form" method="POST" action="actions/otp_verify.php">
                <div class="mb-6">
                    <div class="flex justify-center space-x-3">
                        <input type="text" id="otp1" maxlength="1"
                            class="w-12 h-12 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-blue-200 transition-all duration-200"
                            oninput="this.value = this.value.replace(/[^0-9]/g, ''); if(this.value.length) document.getElementById('otp2').focus()" />
                        <input type="text" id="otp2" maxlength="1"
                            class="w-12 h-12 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-blue-200 transition-all duration-200"
                            oninput="this.value = this.value.replace(/[^0-9]/g, ''); if(this.value.length) document.getElementById('otp3').focus()" />
                        <input type="text" id="otp3" maxlength="1"
                            class="w-12 h-12 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-blue-200 transition-all duration-200"
                            oninput="this.value = this.value.replace(/[^0-9]/g, ''); if(this.value.length) document.getElementById('otp4').focus()" />
                        <input type="text" id="otp4" maxlength="1"
                            class="w-12 h-12 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-blue-200 transition-all duration-200"
                            oninput="this.value = this.value.replace(/[^0-9]/g, ''); if(this.value.length) document.getElementById('otp5').focus()" />
                        <input type="text" id="otp5" maxlength="1"
                            class="w-12 h-12 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-blue-200 transition-all duration-200"
                            oninput="this.value = this.value.replace(/[^0-9]/g, ''); if(this.value.length) document.getElementById('otp6').focus()" />
                        <input type="text" id="otp6" maxlength="1"
                            class="w-12 h-12 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-blue-200 transition-all duration-200"
                            oninput="this.value = this.value.replace(/[^0-9]/g, ''); if(this.value.length) document.getElementById('verifyButton').click()" />
                    </div>
                    <p id="otp-error-message" class="hidden text-red-500 text-xs mt-2 text-center">Please enter a valid 6-digit code</p>
                </div>

                <div class="mb-6 text-center">
                    <p class="text-sm text-gray-600">Didn't receive code? <a href="#" id="resendOtp" class="text-primary hover:text-primary-dark font-medium transition-colors">Resend</a></p>
                    <p id="countdown" class="text-xs text-gray-500 mt-1">Resend available in <span id="timer">30</span>s</p>
                </div>

                <button type="submit" id="verifyButton"
                    class="glow-on-hover w-full bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white font-medium py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-300 transform hover:scale-[1.02] shadow-lg">
                    <span id="verifyButtonText">Verify</span>
                    <i class="fas fa-check-circle ml-2"></i>
                </button>

                <div id="otpError" class="hidden mt-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm text-center">
                    Invalid verification code. Please try again.
                </div>
            </form>

            <div class="mt-6 text-center">
                <button id="backToLogin" class="text-primary hover:text-primary-dark font-medium transition-colors hover:underline">
                    <i class="fas fa-arrow-left mr-1"></i> Back to login
                </button>
            </div>
        </div>
    </div>

    <script src="assets/js/login.js"></script>
</body>
</html>
