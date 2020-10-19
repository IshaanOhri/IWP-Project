$(document).ready(function () {
    $("#btnLogin").click(function (e) {
        e.preventDefault();
        var email = $('#email').val();
        var password = $('#password').val();
        var settings = {
            "url": "https://iwp-project.ml/login",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/json"
            },
            "data": JSON.stringify({ "email": "ishaan99ohri@gmail.com", "password": "hello123" }),
        };
        $(".error1").remove();
        if (email.length < 1) {
            $('#email').after('<span class="error">This field is required</span>');
        } else {
            var regEx = /^[a-z0-9._-]+@[gmail]+.[com]{2,5}$/i;
            var validEmail = regEx.test(email);
            if (!validEmail) {
                $('#email').after('<span class="error">Enter a valid email</span>');
            }
        }
        if (password.length < 8) {
            $('#password').after('<span class="error">Password must be at least 8 characters long</span>');
        }
        else {
            $.ajax(settings).done(function (response) {
                console.log(response);
                window.open("index.html", "_self");

            });
        }
    });
});


