
var countDownDate = new Date().getTime() + (30 * 60 * 1000); // 30 minutes
var savedOptions = {1:0 ,2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0};
var currentQuestion = 1;
const questions = [ null,
`What will be the output?
<p>x = [1, 2, 3]<br>
y = x<br>
y.append(4)<br>
print(x)<br></p>`,

`What will be the output?
<p>x = [10, 20, 30]<br>
y = x.copy()<br>
y.append(40)<br>
print(x)<br></p>`,

`What will be the output?
<p>x = [1, 2, 3, 4]<br>
x.remove(3)<br>
print(x)<br></p>`,

`What will be the output?
<p>x = [5, 10, 15]<br>
x.insert(1, 20)<br>
print(x)<br></p>`,

`What will be the output?
<p>x = [1, 2, 3]<br>
x.extend([4, 5])<br>
print(x)<br></p>`,

`What will be the output?
<p>x = (1, 2, 3)<br>
y = list(x)<br>
y.append(4)<br>
print(tuple(y))<br></p>`,

`What will be the output?
<p>x = {1, 2, 3}<br>
x.add(2)<br>
print(x)<br></p>`,

`What will be the output?
<p>x = {1, 2, 3}<br>
x.add(4)<br>
print(len(x))<br></p>`,

`What will be the output?
<p>d = {"a": 1, "b": 2}<br>
d["c"] = 3<br>
print(d)<br></p>`,

`What will be the output?
<p>d = {"x": 10, "y": 20}<br>
print(d.get("z", 0))<br></p>`
];
const options = [null,
["A. [1, 2, 3]", "B. [1, 2, 3, 4]", "C. [4]", "D. Error"],
["A. [10, 20, 30]", "B. [10, 20, 30, 40]", "C. [40]", "D. Error"],
["A. [1, 2, 3, 4]", "B. [1, 2, 4]", "C. [1, 3, 4]", "D. Error"],
["A. [5, 20, 10, 15]", "B. [5, 10, 20, 15]", "C. [5, 20, 15]", "D. Error"],
["A. [1, 2, 3]", "B. [1, 2, 3, 4]", "C. [1, 2, 3, 4, 5]", "D. Error"],
["A. (1, 2, 3)", "B. (1, 2, 3, 4)", "C. (4)", "D. Error"],
["A. {1}", "B. {1, 2}", "C. {1, 2, 3}", "D. Error"],
["A. 3", "B. 4", "C. 5", "D. Error"],
["A. {'a': 1}", "B. {'a': 1, 'b': 2}", "C. {'a': 1, 'b': 2, 'c':3}", "D. Error"],
["A. None", "B. KeyError", "C. ValueError", "D. 0"]
];
var CorrectAnswers = {1:2 , 2:1, 3:2, 4:1, 5:3, 6:2, 7:3, 8:2, 9:3, 10:4};    
var x = setInterval(function () {
    var now = new Date().getTime();
    var distance = countDownDate - now;
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    document.getElementById("timerData").innerHTML =minutes + "m " + seconds + "s";
    if (distance <= 0) {
        clearInterval(x);
        document.getElementById("timerData").innerHTML = "EXPIRED";
    }

}, 1000);
function resetOptions() {
    for (var i = 1; i <= 4; i++) {
        var option = document.getElementById("option"+i);
        option.style.backgroundColor = "#f1f3f9";
        option.style.color = "#000000";
        option.style = "option:hover{background: #011830; color: white; transform: scale(1.02);}";
    }
}
function selectOption(op) {
        resetOptions();
        var option = document.getElementById("option"+op);
        option.style.backgroundColor = "#011830";
        option.style.color = "#FFFFFF";
        savedOptions[currentQuestion] = op;

}
function saveOption(){
    if (savedOptions[currentQuestion] != 0) {
        alert("Option " + options[currentQuestion][savedOptions[currentQuestion]-1] + " saved for Question " + currentQuestion);
    } else {
        alert("Please select an option before saving.");
    }
}
function changeQuestion(direction) {
    alert("Option " + options[currentQuestion][savedOptions[currentQuestion]-1] + " saved for Question " + currentQuestion);
    if (currentQuestion < 10) {
        if (direction == 1) {
            updateQuestion(currentQuestion + 1);
            
        } else if (direction == -1 && currentQuestion > 1) {
            updateQuestion(currentQuestion - 1);
        } else {
            alert("This is the first question.");
        }
    } else {
        if (direction == -1) {
            updateQuestion(currentQuestion - 1);
        }
        else {
            var score = 0;
            for (var i = 1; i <= 10; i++) {
                if (savedOptions[i] == CorrectAnswers[i]) {
                    score++;
                }
            }
            alert("Your score is: " + score + "/10");
            window.location.href = "main.html";
            document.getElementById("result").innerHTML = "Your score is: " + score + "/10";
        }
    }
}
function updateQuestion(questionNumber) {
    document.getElementById("question"+currentQuestion).style.backgroundColor = "#f1f3f9";
    document.getElementById("question"+currentQuestion).style.color = "#000000";
    currentQuestion = questionNumber;
    document.getElementById("questionData").innerHTML = questions[currentQuestion];
    for (var i = 1; i <= 4; i++) {
        document.getElementById("option"+i).innerHTML = options[currentQuestion][i-1];
    }
    resetOptions();
    if (savedOptions[currentQuestion] != 0) {
        selectOption(savedOptions[currentQuestion]);
    }
    document.getElementById("question"+currentQuestion).style.backgroundColor = "#011830";
    document.getElementById("question"+currentQuestion).style.color = "#ffffff";
    if (currentQuestion == 10) {
        alert("You have reached the last question. Please click 'Next' to submit your quiz.");
        document.getElementById("nextButton").innerHTML = SUBMIT; 
    }
}
