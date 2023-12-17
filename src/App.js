import React, { Component } from 'react';
import Login from './screens/Login/Login'
import Signup from './screens/Signup/Signup'
import QuizList from './screens/QuizList/QuizList'
import QuizInfo from './screens/QuizInfo/QuizInfo'
import StartQuiz from './screens/StartQuiz/StartQuiz'
import './App.css';

import 'typeface-roboto'

class App extends Component {
  constructor() {
    super()

    this.state = {
      quizzes: [

        {
          name: 'React',
          image: require("./images/react.jpg") ,
          description:"React is a JavaScript library for building dynamic UIs. Declarative, efficient, and component-based, it simplifies web development for interactive interfaces.",
          subQuiz: [
            {
              name: 'Quiz 1', questions: '3', time: '30 sec', score: false,
              qArr: [
                {
                  question: "What is the purpose of the 'useState' hook in React?",
                  option1: "To declare a variable",
                  option2: "To manage state in functional components",
                  option3: "To create a new component",
                  option4: "To perform a network request",
                  answer: "2"
                },
                {
                  question: "How can you conditionally render content in React?",
                  option1: "Using the if-else statement",
                  option2: "Using the ternary operator",
                  option3: "Using the switch statement",
                  option4: "React does not support conditional rendering",
                  answer: "2"
                },
                {

                  question: "What is JSX in React?",
                  option1: "JavaScript XML",
                  option2: "Java Syntax Extension",
                  option3: "JSON XML",
                  option4: "JavaScript Extension",
                  answer: "1"
                },

              ]
            },
            {
              name: 'Quiz 2', questions: '3', time: '30 sec', score: false,
              qArr: [
                {
                  question: "What is the significance of the virtual DOM in React?",
                  option1: "It is an alternative to the actual HTML DOM used in React components.",
                  option2: "It is a physical representation of the DOM in the browser.",
                  option3: " It is used to create virtual reality experiences within React applications.",
                  option4: "React does not use a virtual DOM",
                  answer: "1"
                },
                {
                  question: "Explain the concept of state in React?",
                  option1: "It refers to the visual appearance of a React component.",
                  option2: "It is a way to manage and store data within a React component.",
                  option3: " It is a styling mechanism in React applications.",
                  option4: "State is not applicable in React.",
                  answer: "2"
                },
                {

                  question: "What is the role of the 'ReactDOM.render()' method in a React application?",
                  option1: "It is used to create a new React component.",
                  option2: "It is responsible for rendering components into the HTML DOM.",
                  option3: "It is used for applying styles to React components.",
                  option4: " It is a deprecated method in React.",
                  answer: "2"
                }
              ]
            },
          ]
        },
        {
          name: 'Git',
          image: require("./images/git.jpg") ,
          description:'Git is a distributed version control system, tracking changes in source code. Facilitates collaboration, branching, merging, and history management efficiently.',
          subQuiz: [
            {
              name: 'Quiz 1', questions: '4', time: '30 sec', score: false,
              qArr: [
                {
                  question: "What is the purpose of the 'git clone' command in Git?",
                  option1: "To create a new Git repository.",
                  option2: "To copy a remote repository onto your local machine.",
                  option3: "To delete a Git repository.",
                  option4: "To rename a Git repository.",
                  answer: "2"
                },
                {
                  question: "What does the 'git commit' command do in Git",
                  option1: ":It creates a new branch in Git.",
                  option2: "It stages changes for commit in the local repository",
                  option3: "It merges branches in Git.",
                  option4: " It deletes the entire Git history",
                  answer: "2"
                },
                {
                  question: "How do you create a new branch in Git?",
                  option1: "git create-branch [branch name]",
                  option2: "git branch new [branch name]",
                  option3: "git checkout -b [branch name]",
                  option4: "git new-branch [branch name]",
                  answer: "3"
                },
                {
                  question: "What does 'git push' do in Git?",
                  option1: "It pulls changes from a remote repository.",
                  option2: "It updates the local repository with changes from the remote repository.",
                  option3: " It deletes a remote repository.",
                  option4: "It pushes changes from the local repository to a remote repository.",
                  answer: "4"
                },

              ]
            },
          ]
        },
        

      ],


      quizIndex: null,
      subQuizIndex: null,

      qstnNo: 0,

      validFlag: false,
      userFlag: true,

      userName: '',
      userEmail: '',
      userPass: '',
      loginEmail: '',
      loginPass: '',

      user: localStorage.getItem("user"),

    };

    // this.userAvailable = this.userAvailable.bind(this)

    this.updateText = this.updateText.bind(this)
    this.showSignup = this.showSignup.bind(this)
    this.showLogin = this.showLogin.bind(this)
    this.checkValidation = this.checkValidation.bind(this)

    this.joinQuiz = this.joinQuiz.bind(this);
    this.showList = this.showList.bind(this);
    this.startQuiz = this.startQuiz.bind(this);
    this.nextQstn = this.nextQstn.bind(this);
    this.back = this.back.bind(this);

    this.logout = this.logout.bind(this);
  }

  async updateText(e) {
    // console.log(e.target.name)
    // console.log(e.target.value)
    const name = e.target.name;
    const value = e.target.value;

    if (name.match('name')) {
      await this.setState({
        userName: value
      })
      localStorage.setItem('userName', this.state.userName)
    }
    else if (name.match('userEmail')) {
      await this.setState({
        userEmail: value
      })
      localStorage.setItem('userEmail', this.state.userEmail)
    }
    else if (name.match('userPassword')) {
      await this.setState({
        userPass: value
      })
      localStorage.setItem('userPass', this.state.userPass)
    }
    else if (name.match('loginEmail')) {
      await this.setState({
        loginEmail: value
      })
    }
    else if (name.match('loginPass')) {
      await this.setState({
        loginPass: value
      })
    }
  }

  showSignup() {
    this.setState({
      userFlag: false,
      loginEmail: '',
      loginPass: ''
    })
  }

  showLogin() {
    const {userEmail, userPass} = this.state;
    if(userEmail == ''  || userPass == ''){
    alert('Fill all the fields');
  }
  else{
    this.setState({
      userFlag: true,
      userEmail:'',
      userPass:'',
    })
  }
  }


  async checkValidation() {
    const { loginEmail, loginPass } = this.state
    if ((loginEmail.match(localStorage.getItem('userEmail'))) && (loginPass.match(localStorage.getItem('userPass')))) {
      await this.setState({
        validFlag: true,
        user: true,
      })
      localStorage.setItem('user', 'true')
    }
    console.log("Email is Valid :", this.state.validFlag)
  }


  logout() {
    this.setState({
      // quizIndex: null,
      // subQuizIndex: null,
      user: 'false',
      // userFlag: false,
      validFlag: false,
      loginEmail: '',
      loginPass: '',
      quiz: null,
      started: null,
      qstnNo: 0,
    })
    localStorage.setItem('user', 'false')
  }

  joinQuiz(quizIndex) {
    const { quizzes } = this.state;
    this.setState({
      quiz: quizzes[quizIndex],
      quizIndex: quizIndex,
      quizName: quizzes[quizIndex].name,
    });
  }

  showList() {
    this.setState({ quiz: null });
  }

  startQuiz(subQuizIndex) {
    const { quizzes, quizIndex } = this.state;

    this.setState({
      started: quizzes[quizIndex].subQuiz[subQuizIndex],
      subQuizIndex: subQuizIndex,
      subQuizName: quizzes[quizIndex].subQuiz[subQuizIndex].name,
    });
  }

  nextQstn(nextQstnNo) {

    this.setState({
      qstnNo: nextQstnNo + 1
    });
  }

  back() {
    this.setState({
      started: null,
      qstnNo: 0,
    });
  }


  render() {
    const { userFlag, validFlag, quizzes, quiz, started, qstnNo, quizName, subQuizName, user } = this.state;

    return (
      <center>
      <div>
        {(user === 'false' || user === null) && !userFlag && <Signup updateText={this.updateText} showLogin={this.showLogin} />}
        {(user === 'false' || user === null) && (userFlag && !validFlag) && <Login showSignup={this.showSignup} validation={this.checkValidation} updateText={this.updateText} />}
        {(user === 'true' || (userFlag && validFlag)) && (!quiz && !started) && <QuizList list={quizzes} onPress={this.joinQuiz} logout={this.logout} />}
        {(user === 'true' || (userFlag && validFlag)) && (quiz && !started) && <QuizInfo quiz={quiz} onPress={this.startQuiz} onBack={this.showList} logout={this.logout} />}
        {(user === 'true' || (userFlag && validFlag)) && started && <StartQuiz quizName={quizName} subQuizName={subQuizName} started={started} qstnNo={qstnNo} onPress={this.nextQstn} back={this.back} logout={this.logout} />}
      </div>
      </center>
    )
  }

}

export default App;