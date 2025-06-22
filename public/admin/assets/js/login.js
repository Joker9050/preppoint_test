// Client-side login and OTP verification logic with backend integration

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const loginForm = document.getElementById('loginForm');
    const otpForm = document.getElementById('otpForm');
    const backToLogin = document.getElementById('backToLogin');
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('email-error');
    const emailErrorMessage = document.getElementById('email-error-message');
    const emailValidMessage = document.getElementById('email-valid-message');
    const passwordError = document.getElementById('password-error');
    const passwordErrorMessage = document.getElementById('password-error-message');
    const loginError = document.getElementById('loginError');
    const loginErrorText = document.getElementById('loginErrorText');
    const otpError = document.getElementById('otpError');
    const emailDisplay = document.getElementById('emailDisplay');
    const countdownElement = document.getElementById('countdown');
    const timerElement = document.getElementById('timer');
    const otpInputs = Array.from({length: 6}, (_, i) => document.getElementById(`otp${i+1}`));

    // Toggle between forms
    function switchForms(hideForm, showForm) {
        hideForm.classList.add('hidden');
        showForm.classList.remove('hidden');
    }

    // Password visibility toggle
    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        togglePassword.innerHTML = type === 'password' ? '<i class="far fa-eye"></i>' : '<i class="far fa-eye-slash"></i>';
    });

    backToLogin.addEventListener('click', function(e) {
        e.preventDefault();
        switchForms(otpForm, loginForm);
    });

    // Login form submission
    document.getElementById('login-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset all error states
        emailError.classList.add('hidden');
        emailErrorMessage.classList.add('hidden');
        emailValidMessage.classList.add('hidden');
        passwordError.classList.add('hidden');
        passwordErrorMessage.classList.add('hidden');
        loginError.classList.add('hidden');
        emailInput.classList.remove('border-red-500', 'shake');
        passwordInput.classList.remove('border-red-500', 'shake');

        const email = emailInput.value;
        const password = passwordInput.value;
        let isValid = true;

        // Validate email format
        if (!validateEmail(email)) {
            emailError.classList.remove('hidden');
            emailErrorMessage.textContent = 'Please enter a valid email address';
            emailErrorMessage.classList.remove('hidden');
            emailInput.classList.add('border-red-500', 'shake');
            isValid = false;
        }

        // Validate password length
        if (password.length < 6) {
            passwordError.classList.remove('hidden');
            passwordErrorMessage.textContent = 'Password must be at least 6 characters';
            passwordErrorMessage.classList.remove('hidden');
            passwordInput.classList.add('border-red-500', 'shake');
            isValid = false;
        }

        if (!isValid) return;

        // Show loading state
        const loginButton = document.getElementById('loginButton');
        loginButton.disabled = true;
        loginButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Verifying...';

        // Call backend login-handler.php
        fetch('actions/login-handler.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({ email, password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                // Show OTP form
                switchForms(loginForm, otpForm);
                emailDisplay.textContent = email;
                startCountdown();
            } else {
                showLoginError(data.message || 'Login failed');
            }
        })
        .catch(() => {
            showLoginError('Network error. Please try again.');
        })
        .finally(() => {
            loginButton.disabled = false;
            loginButton.innerHTML = '<span id="loginButtonText">Login</span><i class="fas fa-arrow-right ml-2"></i>';
        });
    });

    // OTP form submission
    document.getElementById('otp-verification-form').addEventListener('submit', function(e) {
        e.preventDefault();
        otpError.classList.add('hidden');

        const otp = otpInputs.map(input => input.value).join('');

        if (otp.length !== 6) {
            otpError.textContent = 'Please enter a valid 6-digit code';
            otpError.classList.remove('hidden');
            otpInputs.forEach(input => {
                input.classList.add('border-red-500', 'shake');
                setTimeout(() => input.classList.remove('shake'), 500);
            });
            return;
        }

        // Show loading state
        const verifyButton = document.getElementById('verifyButton');
        verifyButton.disabled = true;
        verifyButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Verifying...';

        // Call backend otp_verify.php
        fetch('actions/otp_verify.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({ otp })
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                verifyButton.innerHTML = '<i class="fas fa-check-circle mr-2"></i> Verified!';
                verifyButton.classList.remove('from-primary', 'to-primary-dark', 'hover:from-primary-dark', 'hover:to-primary');
                verifyButton.classList.add('from-green-500', 'to-green-600', 'hover:from-green-600', 'hover:to-green-700');
                setTimeout(() => {
                    window.location.href = 'dashboard.php';
                }, 1000);
            } else {
                verifyButton.disabled = false;
                verifyButton.innerHTML = '<span id="verifyButtonText">Verify</span><i class="fas fa-check-circle ml-2"></i>';
                otpError.textContent = data.message || 'Invalid verification code. Please try again.';
                otpError.classList.remove('hidden');
                otpInputs.forEach(input => {
                    input.classList.add('border-red-500', 'shake');
                    setTimeout(() => input.classList.remove('shake'), 500);
                });
            }
        })
        .catch(() => {
            verifyButton.disabled = false;
            verifyButton.innerHTML = '<span id="verifyButtonText">Verify</span><i class="fas fa-check-circle ml-2"></i>';
            otpError.textContent = 'Network error. Please try again.';
            otpError.classList.remove('hidden');
        });
    });

    // Resend OTP with countdown
    let countdown = 30;
    let countdownInterval;

    function startCountdown() {
        countdownElement.classList.remove('hidden');
        countdown = 30;
        timerElement.textContent = countdown;

        clearInterval(countdownInterval);
        countdownInterval = setInterval(() => {
            countdown--;
            timerElement.textContent = countdown;

            if (countdown <= 0) {
                clearInterval(countdownInterval);
                countdownElement.classList.add('hidden');
            }
        }, 1000);
    }

    document.getElementById('resendOtp').addEventListener('click', function(e) {
        e.preventDefault();

        if (countdown > 0) return;

        fetch('actions/login-handler.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                email: emailDisplay.textContent,
                password: '' // No password needed for resend, backend should handle accordingly
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                alert('New OTP has been sent to your email!');
                startCountdown();
            } else {
                alert(data.message || 'Failed to resend OTP.');
            }
        })
        .catch(() => {
            alert('Network error. Please try again.');
        });
    });

    // Helper functions
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function showLoginError(message) {
        loginErrorText.textContent = message;
        loginError.classList.remove('hidden');
        emailInput.classList.add('border-red-500', 'shake');
        passwordInput.classList.add('border-red-500', 'shake');
        setTimeout(() => {
            emailInput.classList.remove('shake');
            passwordInput.classList.remove('shake');
        }, 500);
    }
});
