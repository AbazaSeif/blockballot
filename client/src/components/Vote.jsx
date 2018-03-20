import React from 'react';
import axios from 'axios';
import Checkbox from 'material-ui/Checkbox';

class Vote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uniqueId: '',
      isLogin: false,
      isVoteSubmitted: false,
      isBallotCompleted: false,
      ballotName: 'ballot name from database', // database input will replace 
      ballotOption: [  // database input will replace 
        { optionName:'question1',
          optionAnswer: false
        },
        { optionName:'question2',
        optionAnswer: true
        },
        { optionName:'question3',
        optionAnswer: false
        }
      ]
    };
    this.updateCheck = this.updateCheck.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    // get the ballotName and ballot question to update the state
  } 

  updateCheck(event) {
    // this.setState((oldState) => {
    //   return {
    //     checked: !oldState.checked,
    //   };
    // });
  }

  handleSubmit(event) {
    // event.preventDefault();
    // axios({
    //   method: 'POST',
    //   url: '/api/Voter',
    //   data: {
    //     uniqueId: this.state.uniqueId
    //   }
    // })
    // .then(function (res) {
    //   console.log('found unique ID', res);
    // })
    // .catch(function (error) {
    //   console.log(error);
    // });
  }

  render() {
    let ballotInfo = this.state;
    let ballotQuestionList = ballotInfo.ballotOption.map((option, index) => {
      return  <Checkbox className="checkbox" labelPosition="left" key={index} label={option.optionName} checked={option.optionAnswer} onCheck={this.updateCheck}/>
    })

    return (
      <form>
        <label>
          <div>VOTE PAGE</div>
          <div>{ballotInfo.ballotName}</div>
          <div className="block" >{ballotQuestionList}</div>
        </label>
        <input type="submit" value="Submit" onClick={this.handleSubmit} />
      </form>
    )
  }
}

export default Vote;