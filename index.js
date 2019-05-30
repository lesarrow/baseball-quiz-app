"use strict";

/* I create a bunch of classes here to store the data. */

/* Score holds the details of the score. I use it in order to pass score around as reference */

class Score {

    constructor() {
        this.correct = 0;
        this.wrong = 0;
    }

    reset() {
        this.correct = 0;
        this.wrong = 0;
    }

    addCorrect() {
        this.correct++;
    }

    addWrong() {
        this.wrong++;
    }

    getCorrect() {
        return this.correct;
    }

    getWrong() {
        return this.wrong;
    }

    getPercent() {
        if ((this.getCorrect() + this.getWrong()) != 0)
            return Math.round((this.correct/(this.correct + this.wrong))*10000)/100;
        return 0;
    }

}

/* Answer contains a single answer and whether the answer is correct or wrong. Answers are added to questions */

class Answer {

    constructor(strText, boolCorrect) {
        this.text = strText;
        this.correct = boolCorrect;
    }

    getText() {
        return this.text;
    }

    getCorrect() {
        return this.correct;
    }
}

/* Question contains the question being asks and an array of answer objects. */

class Question {

    constructor(strText) {
        this.text = strText;
        this.answers = [];
    }

    getText() {
        return this.text;
    }

    getAnswers() {
        return this.answers;
    }

    addAnswer(objAnswer) {
        this.answers.push(objAnswer);
    }

    getCorrectAnswerIndex() {

        for (let i=0; i<this.answers.length; i++) {
            if (this.answers[i].getCorrect())
                return i;
        }

        return null;
    }

    getCorrectAnswer() {

        for (let i=0; i<this.answers.length; i++) {
            if (this.answers[i].getCorrect())
                return this.answers[i].getText();
        }

        return "Error - no correct answer found";
    }
}


/* Create objects representing our questions and answers */

function buildQuestionSet() {
    
    let questionList = [];

    // Question 1
    let question = new Question("If you were scoring a baseball game with pen and paper and wrote 6-3 after a play, what does that mean?");
    question.addAnswer(new Answer("The score is Visitors 6 and Home Team 3", false));
    question.addAnswer(new Answer("The score is Home Team 6 and Visitors 3", false));
    question.addAnswer(new Answer("An out, First Base to Shortstop", false));
    question.addAnswer(new Answer("An out, Shortstop to First Base", true));
    questionList.push(question);

    // Question 2

    question = new Question("The Designated Hitter rule is used only in the _______");
    question.addAnswer(new Answer("National League", false));
    question.addAnswer(new Answer("9th Inning", false));
    question.addAnswer(new Answer("1st Inning", false));
    question.addAnswer(new Answer("American League", true));
    questionList.push(question);

    // Question 3

    question = new Question("If a run scores as a result of an error, that run is _______");
    question.addAnswer(new Answer("Earned", false));
    question.addAnswer(new Answer("Assessed to the pitcher", false));
    question.addAnswer(new Answer("Unearned", true));
    question.addAnswer(new Answer("Worth half as much", false));
    questionList.push(question);

    // Question 4

    question = new Question("A no-hitter is rare in Major League baseball because _______");
    question.addAnswer(new Answer("Pitchers are bad at hitting", false));
    question.addAnswer(new Answer("It is hard to keep major league hitters from getting a hit in 9 or more innings", true));
    question.addAnswer(new Answer("The length between the bases is so short", false));
    question.addAnswer(new Answer("No-hitters have not been possible since 2012", false));
    questionList.push(question);

    // Question 5

    question = new Question("If a pitcher strikes out the side, that means ________");
    question.addAnswer(new Answer("The pitcher made all outs in the inning by strikeout", true));
    question.addAnswer(new Answer("All pitches landed for a strike in the inning", false));
    question.addAnswer(new Answer("Three batters struck out on only 9 pitches", false));
    question.addAnswer(new Answer("There were no walks in the innings", false));
    questionList.push(question);
  
    // Question 6

    question = new Question("Which of the following events does not affect a batter's batting average?");
    question.addAnswer(new Answer("Error by the opposing team", false));
    question.addAnswer(new Answer("A single up the middle", false));
    question.addAnswer(new Answer("Base on balls", true));
    question.addAnswer(new Answer("Strike out", false));
    questionList.push(question);

    // Question 7

    question = new Question("Which of the following counts represents a strike out?");
    question.addAnswer(new Answer("2-3", true));
    question.addAnswer(new Answer("4-0", false));
    question.addAnswer(new Answer("4-3", false));
    question.addAnswer(new Answer("0-4", false));
    questionList.push(question);

    // Question 8

    question = new Question("A player gets a home run if ________");
    question.addAnswer(new Answer("The ball bounces on the field and then over the wall", false));
    question.addAnswer(new Answer("The pitcher balks", false));
    question.addAnswer(new Answer("The ball hits the wall and then gets stuck", false));
    question.addAnswer(new Answer("The ball hits the foul pole", true));
    questionList.push(question);

    // Question 9

    question = new Question("Who can eject a player from a baseball game");
    question.addAnswer(new Answer("The manager", false));
    question.addAnswer(new Answer("The umpire", true));
    question.addAnswer(new Answer("The commissioner", false));
    question.addAnswer(new Answer("No one can eject a player from a baseball game", false));
    questionList.push(question);

    // Question 10

    question = new Question("If after 9 innings the game is a tie, what happens?");
    question.addAnswer(new Answer("The game is declared a tie", false));
    question.addAnswer(new Answer("The game goes into extra innings", true));
    question.addAnswer(new Answer("The game is cancelled", false));
    question.addAnswer(new Answer("The game goes into sudden death", false));
    questionList.push(question);

    return questionList;

}


function processQuestionResult(question, score) {

    let checkedNum;
    let correct;
    let correctOrWrongMsg;

    let answerNum = question.getCorrectAnswerIndex();

    if (answerNum === null)
        console.log("Error in processQuestionResult. getCorrectAnswerIndex returned null");

    $('.quiz-form').find('input').each(function(index) {
        if (this.checked)
            checkedNum = index;
    });

    if (answerNum === checkedNum) {
        score.addCorrect();
        correct = true;
        correctOrWrongMsg = "Congratulations, you answered correctly!";
    }
    else {
        score.addWrong();
        correct = false;
        correctOrWrongMsg = "Sorry you answered incorrectly. The correct answer was: " + question.getCorrectAnswer();
    } 

    $('.correctOrWrongMsg').text(correctOrWrongMsg);
    $('.correctOrWrong').show();

}


function renderNextQuestion(question) {

    // hide the quiz start message 
    $('.quiz-start').css("display", "none");
    $('.quiz-end').css("display", "none");

    // set the questions and answers and display them 

    $('.question').text(question.getText());
    let answers = question.getAnswers();
    $('.answer1').text(answers[0].getText());
    $('.answer2').text(answers[1].getText());
    $('.answer3').text(answers[2].getText());
    $('.answer4').text(answers[3].getText());

    // set the text of the button
    $('.quiz-submit').text("Lock in my answer");

    $('.question-block').css("display", "block");
}


function renderScore(score) {

    $('.js-correct').text(score.getCorrect());
    $('.js-wrong').text(score.getWrong());
    $('.js-percent-correct').text(score.getPercent() + "%");
    $('.score').css("display", "block");
}

function renderFinal(score) {
   
    $('.question-block').css("display", "none");
    $('.score').css("display", "none");
    $('.quiz-end').css("display","block");


    $('.js-total').text(score.getCorrect() + score.getWrong());
    $('.quiz-submit').text("Press to restart quiz");
}


function handleCorrectWrong(questionStatus, score, questionList) {

    $('.correctOrWrongBtn').click(e => {

        /* If there is another question, render it */

        if (questionStatus.questionNum <= 10)
            renderNextQuestion(questionList[questionStatus.questionNum - 1]);

        /* If at the end of the quiz, show the final score */

        if (questionStatus.questionNum > 10)
            renderFinal(score);

        $('.correctOrWrong').hide();

    });

}

function handleSubmitButton(questionStatus, score, questionList) {

    $('.quiz-submit').click(e => {

        e.preventDefault();

        
        /* If starting the quiz first time, increase the
            question number, render the first question, and show the score */

            if (questionStatus.questionNum == 0) {
                questionStatus.questionNum = 1;
                renderNextQuestion(questionList[questionStatus.questionNum-1]);
            }        
        
        /* If answering a question, process the question result  */

            else if ((questionStatus.questionNum > 0) && (questionStatus.questionNum <= 10)) {

                questionStatus.questionNum++;

                /* Unexpected code alert - I use index questionStatus.questionNum-2 rather than
                    -1 this time because I incremented the question number above. I chose to 
                    increment the question number here instead of in processQuestionResult 
                    because I thought it was more intuitive. */

                processQuestionResult(questionList[questionStatus.questionNum-2], score);
            }


        /* If at the final score dialog, set the question number back to 1,
            reset the score, and render the first question and the score */

            else if (questionStatus.questionNum > 10) {
                score.reset();
                questionStatus.questionNum = 1;
                renderNextQuestion(questionList[questionStatus.questionNum-1], score);
            }

            renderScore(score);

    });

}

function handleQuizApp() {
   
    /* Initialize the Score Object */
    let score = new Score();

    /* Initialize the question number */
    let questionStatus = {
        questionNum: 0
    };

    /* Build the question and answer objects */
    let questionList = buildQuestionSet();

    /* Handle the submit button */

    handleSubmitButton(questionStatus, score, questionList);

    /* Handle the Correct/Wrong Dialog */

    handleCorrectWrong(questionStatus, score, questionList);
}


$(handleQuizApp);