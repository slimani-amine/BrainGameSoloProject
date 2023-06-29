$(document).ready(function () {
    // login 
    var btn = $('#button');
    console.log(btn);
    $("#game").hide()
    function authenticateUser(email, password) {
        var users = JSON.parse(localStorage.getItem('users'));
        for (var i = 0; i < users.length; i++) {
            if (email === users[i].email && password === users[i].password) {
                return true;
            }
        }
        return false;
    }
    function validateEmail(email) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }
    function displayUser(email, password) {
        var users = JSON.parse(localStorage.getItem('users'))
        for (var i = 0; i < users.length; i++) {
            if (email === users[i].email && password === users[i].password) {
                return users[i].firstName + " Your score is " + users[i].score
            }
        }
    }
    btn.on('click', function (event) {
        event.preventDefault();
        var email = $('#email').val();
        var password = $('#password').val();
        if (email.length === 0 || !validateEmail(email)) {
            alert("Invalid Email. Please enter a valid email address.");
        } else if (password.length < 8) {
            alert("Invalid Password. Please enter a password with a minimum of 8 characters.");
        } else if (authenticateUser(email, password)) {
            alert("Welcome back! You are now logged in as " + displayUser(email, password));
            $("#login").hide();
            $("#game").show();
        } else {
            alert("Invalid Credentials. Please try again or sign up.");
        }
    });

    // sign up
    var btns = $('#sbutton');
    console.log(btns);

    function saveUser(firstName, lastName, email, password) {
        var users = JSON.parse(localStorage.getItem('users'));
        console.log(users);
        if (!users) {
            var arr = [];
            arr.push({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                score: 0
            });
            localStorage.setItem("users", JSON.stringify(arr));
        } else {
            users.push({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                score: 0
            });
            localStorage.setItem("users", JSON.stringify(users));
        }
    }

    btns.on('click', function (event) {
        event.preventDefault();
        console.log("hello");
        var firstName = $("#firstName").val();
        var lastName = $("#lastName").val();
        var email = $("#emails").val();
        var password = $("#passwords").val();
        var cpassword = $("#cpassword").val();
        if (firstName.length === 0 || /[0-9]/.test(firstName)) {
            alert("Invalid First Name. Please enter a valid name without numbers.");
        } else if (lastName.length === 0 || /[0-9]/.test(lastName)) {
            alert("Invalid Last Name. Please enter a valid name without numbers.");
        } else if (email.length === 0 || !validateEmail(email)) {
            alert("Invalid Email. Please enter a valid email address.");
        } else if (password.length < 8) {
            alert("Invalid Password. Please enter a password with a minimum of 8 characters.");
        } else if (cpassword.length < 8 || cpassword !== password) {
            alert("Invalid Confirm Password. Please make sure it matches the password you entered.");
        } else if (authenticateEmail(email)) {
            alert("Account Already Exists. You already have an account associated with this email address.");
        } else {
            saveUser(firstName, lastName, email, password);
            window.location.href = "login.html";
        }
    });

    function validateEmail(email) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    function authenticateEmail(email) {
        var users = JSON.parse(localStorage.getItem('users'));
        if (users) {
            for (var i = 0; i < users.length; i++) {
                if (users[i].email === email) {
                    return true;
                }
            }
        }
        return false;
    }
    // game
    $('.sections').hide()

    $('.play').on('click', function () {
        $('#game-paragraph').hide()
        $(('#game1')).show()
    })

    var users = JSON.parse(localStorage.getItem('users'))
    var email = $('#email').val();
    var password = $('#password').val();
    for (var i = 0; i < users.length; i++) {
        if (email === users[i].email && password === users[i].password) {
            var globalScore = users[i].score
        }
    }
    // game1
    var secretNumber;
    var guessCount = 0;
    startGame();
    $(".submit-button").click(function () {
        var userGuess = parseInt($(".guess-input").val());

        if (isNaN(userGuess) || userGuess < 1 || userGuess > 5) {
            $(".feedback").text("Invalid guess. Please enter a number between 1 and 5.");
        } else {
            guessCount++;
            checkGuess(userGuess);
        }

        $(".guess-input").val("");
    });

    function startGame() {
        secretNumber = randomNumber();
        guessCount = 0;
        $(".feedback").text("");
    }

    function randomNumber() {
        return Math.floor(Math.random() * 5) + 1;
    }

    function checkGuess(guess) {
        if (guess === secretNumber) {
            $(".feedback").text("Congratulations! You guessed the number in " + guessCount + " attempts.");
            globalScore = Math.abs(guessCount - 5) * 1
            var btn = $("<button>next</button>")
            btn.attr('id', 'btn1')
            $('.game-container').append(btn)
            btn.click(function () {
                $(('#game1')).hide()
                $(('#game2')).show()
            })
        } else if (guess < secretNumber) {
            $(".feedback").text("Too low! Try a higher number.");
        } else {
            $(".feedback").text("Too high! Try a lower number.");
        }
    }

    // game2

    var questions1 = [
        {
            question: "What is the capital of France?",
            options: ["Paris", "London", "Berlin", "Madrid"],
            correctAnswer: "Paris"
        },
        {
            question: "What is the largest planet in our solar system?",
            options: ["Mars", "Venus", "Saturn", "Jupiter"],
            correctAnswer: "Jupiter"
        },
        {
            question: "Who painted the Mona Lisa?",
            options: ["Leonardo da Vinci", "Pablo Picasso", "Vincent van Gogh", "Michelangelo"],
            correctAnswer: "Leonardo da Vinci"
        },
        {
            question: "Which country won the 2018 FIFA World Cup?",
            options: ["Brazil", "Germany", "France", "Spain"],
            correctAnswer: "France"
        }
    ];

    var currentQuestion1 = 0;
    var score = 0;

    function displayQuestion1() {
        var question = questions1[currentQuestion1];
        $(".question").text(question.question);
        $(".option").each(function (i) {
            $(this).text(question.options[i]);
        });
    }

    function checkAnswer1(selectedOption) {
        var question = questions1[currentQuestion1];
        if (selectedOption === question.correctAnswer) {
            score++;
        }
    }
    $(".option").click(function () {
        $(this).addClass("selected");
    });
    $(".next-button").click(function () {
        var selectedOption = $("li.option.selected").text();
        if (selectedOption !== "") {
            checkAnswer1(selectedOption);
            currentQuestion1++;
            if (currentQuestion1 < questions1.length) {
                displayQuestion1();
                $(".option").removeClass("selected");
            } else {
                showResult1();
                var btn2 = $("<button id='btn2'>next</button>")
                $('.quiz1-container').append(btn2)
                btn2.on('click', function () {
                    globalScore += (score * 2)
                    $(('#game2')).hide()
                    $(('#game3')).show()
                })
            }
        }
    });

    function showResult1() {
        $(".quiz1-container").html("<h2>Quiz Completed</h2><p>Your score: " + score + "/4" + "</p>");
    }

    displayQuestion1();

    // game3

    var questions2 = [
        {
            question: "What is the next number in the sequence: 1, 4, 9, 16, 25, ...?",
            options: ["30", "36", "42", "49"],
            correctAnswer: "36"
        },
        {
            question: "Which one of the five choices makes the best comparison? Finger is to Hand as Leaf is to:",
            options: ["Tree", "Branch", "Bark", "Twig"],
            correctAnswer: "Twig"
        },
        {
            question: "If all Zips are Zams and all Zams are Zoons, then all Zips are definitely Zoons.",
            options: ["True", "False"],
            correctAnswer: "True"
        },
        {
            question: "Which one of the five is least like the other four?",
            options: ["Dog", "Mouse", "Lion", "Snake", "Elephant"],
            correctAnswer: "Snake"
        }
    ];
    var currentQuestion2 = 0;
    var score2 = 0;

    function displayQuestion2() {
        var question = questions2[currentQuestion2];
        $(".question2").text(question.question);
        $(".option2").each(function (i) {
            $(this).text(question.options[i]);
        });
    }

    function checkAnswer2(selectedOption) {
        var question = questions2[currentQuestion2];
        if (selectedOption === question.correctAnswer) {
            score2++;
        }
    }

    $(".next-button2").click(function () {
        var selectedOption = $(".option2.selected").text();
        if (selectedOption !== "") {
            checkAnswer2(selectedOption);
            currentQuestion2++;
            if (currentQuestion2 < questions2.length) {
                displayQuestion2();
                $(".option2").removeClass("selected");
            } else {
                showResult2();
                globalScore += score2 * 3
                globalScore = globalScore / 6
                var btn3 = $("<button id='btn3'>show global score</button>")
                $('.quiz2-container').append(btn3)
                btn3.on('click', function () {
                    if (globalScore <= 1) {
                        alert(globalScore + " your overall performance is very bad.")
                    } else if (globalScore <= 2) {
                        alert(globalScore + " an average performance ")

                    } else if (globalScore <= 3) {
                        alert(globalScore + " a good performance")

                    } else {
                        alert(globalScore + " an excellent performance")
                    }
                    var users = JSON.parse(localStorage.getItem('users'))
                    var email = $('#email').val();
                    var password = $('#password').val();
                    for (var i = 0; i < users.length; i++) {
                        if (email === users[i].email && password === users[i].password) {
                            users[i].score = globalScore
                        }
                    }
                    $('#game3').hide()
                    $('#rating').show()
                })
            }
        }
    });

    $(".option2").click(function () {
        $(".option2").removeClass("selected");
        $(this).addClass("selected");
    });
    function showResult2() {
        $(".quiz2-container").html("<h2>Quiz Completed</h2><p>Your score: " + score2 + "/4" + "</p>");
    }
    displayQuestion2();

    // rating
    $('.ratebtn').on('click', function () {
        alert('thank you')
        window.location.href = "home.html"
    })
})

