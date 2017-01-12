if (window.FC === undefined) { window.FC = {}; }

(function() {

  class QuizzerComponent extends React.Component {

    constructor() {
      super();

      this.state = {
        currentCard: 0,
        showFront: true
      }
    }

    componentDidMount() {
      var cb = (set) => {
        // copy and shuffle array
        var shuffledCards = _.shuffle(set.cards.slice(0));

        this.setState({
          cards: shuffledCards,
          currentCard: 0,
          showFront: true,
          summary: false,
          sessionCorrectCount: 0,
          sessionIncorrectCount: 0,
          skipped: 0
        });
      };

      FC.UserData.getSet(this.props.params.setId, cb);

    }

    cardClicked() {
      var copiedState = Object.assign({}, this.state);
      copiedState.showFront = !copiedState.showFront;

      this.setState(copiedState);
    }

    endResetValidation(){
      var currentPosition = this.state.currentCard;
      if (currentPosition + 1 >= this.state.cards.length) {
        console.log('current position', currentPosition);
        var copiedState = Object.assign({}, this.state);
        copiedState.summary = true;
        this.setState(copiedState);
        return;
      }
      else if (currentPosition + 1 >= 10) {
        var copiedState = Object.assign({}, this.state);
        copiedState.summary = true;
        this.setState(copiedState);
        return;
      } else if (currentPosition + 1 >= 10) {
        var copiedState = Object.assign({}, this.state);
        copiedState.summary = true;
        this.setState(copiedState);
        return;
      }
      var copiedState = Object.assign({}, this.state);
      copiedState.currentCard += 1;
      this.setState(copiedState);
    }

    markCorrect() {
      var card = this.state.cards[this.state.currentCard];
      this.state.sessionCorrectCount += 1;
      console.log('correct count', card.correctCount);
      FC.UserData.incrementCorrectCountOnCard(this.props.params.setId, card.id, () => {});

      this.endResetValidation();

    }

    markIncorrect() {
      var card = this.state.cards[this.state.currentCard];
      this.state.sessionIncorrectCount += 1;
      FC.UserData.incrementIncorrectCountOnCard(this.props.params.setId, card.id, () => {});

      this.endResetValidation();

    }

    quizRestart() {

      var shuffledCards = _.shuffle(this.state.cards.slice(0));

      this.setState({
        cards: shuffledCards,
        currentCard: 0,
        showFront: true,
        summary: false,
        sessionCorrectCount: 0,
        sessionIncorrectCount: 0,
        skipped: 0
      });
    }

    canvasLoad() {

    }

    skipCard() {
      var currentPosition = this.state.currentCard;

      if (currentPosition + 1 >= this.state.cards.length) {
        var copiedState = Object.assign({}, this.state);
        copiedState.summary = true;
        copiedState.skipped += 1;
        this.setState(copiedState);
        return;
      } else if (currentPosition + 1 >= 10) {
        var copiedState = Object.assign({}, this.state);
        copiedState.summary = true;
        copiedState.skipped += 1;
        this.setState(copiedState);
        return;
      }
      else if (currentPosition + 1 >= 10) {
        var copiedState = Object.assign({}, this.state);
        copiedState.summary = true;
        copiedState.skipped += 1;
        this.setState(copiedState);
        return;
      }

      var copiedState = Object.assign({}, this.state);
      copiedState.skipped += 1;
      copiedState.currentCard += 1;
      this.setState(copiedState);
    }

    render() {

      var cardShower;
      var cardNavigation;
      var quizSummary;


      if (this.state.summary === true) {


        quizSummary = <div><h2>Summary</h2>
          <p>Correct: {this.state.sessionCorrectCount}</p>
          <p>Incorrect: {this.state.sessionIncorrectCount}</p>
          <p>Skipped: {this.state.skipped}</p>
          <FC.GraphComponent correct={this.state.sessionCorrectCount} incorrect={this.state.sessionIncorrectCount} skipped={this.state.skipped} />
          <ul className="label">
            <li>Correct</li>
            <li className="label-li-two">Incorrect</li>
            <li className="label-li-three">Skipped</li>
          </ul>
          <p className="p-button" onClick={() => { this.quizRestart(); }}>Quiz Restart</p>
          <p className="p-button" onClick={() => { this.quizRestart(); ReactRouter.browserHistory.goBack(); }}>Back to set list</p>
        </div>

      }

      else if (this.state.cards !== undefined && this.state.cards.length > 0) {
        var currentCard = this.state.cards[this.state.currentCard];
        var textToShow = this.state.showFront ? currentCard.front: currentCard.back;

        cardShower = <div>
          <div>Card count: {this.state.cards.length}</div>
          <div className="card" onClick={(evt) => { this.cardClicked(evt); }}>
          {textToShow}
          </div>
        </div>


        cardNavigation = <div className="card-navigation">
          <div className="correct" onClick={() => { this.markCorrect();}}>Correct</div>
          <div className="incorrect" onClick={() => {this.markIncorrect();}}>Incorrect</div>
          <div onClick={() => { this.skipCard(); }}>Skip</div>
        </div>;
      }


      return <div className="quizzer">
        <h1>The Quizzer</h1>

        {quizSummary}
        {cardShower}
        {cardNavigation}
      </div>
    }

  }

  FC.QuizzerComponent = QuizzerComponent;

})();
