'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

if (window.FC === undefined) {
  window.FC = {};
}

(function () {
  var QuizzerComponent = function (_React$Component) {
    _inherits(QuizzerComponent, _React$Component);

    function QuizzerComponent() {
      _classCallCheck(this, QuizzerComponent);

      var _this = _possibleConstructorReturn(this, (QuizzerComponent.__proto__ || Object.getPrototypeOf(QuizzerComponent)).call(this));

      _this.state = {
        currentCard: 0,
        showFront: true
      };
      return _this;
    }

    _createClass(QuizzerComponent, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        var _this2 = this;

        var cb = function cb(set) {
          // copy and shuffle array
          var shuffledCards = _.shuffle(set.cards.slice(0));

          _this2.setState({
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
    }, {
      key: 'cardClicked',
      value: function cardClicked() {
        var copiedState = Object.assign({}, this.state);
        copiedState.showFront = !copiedState.showFront;

        this.setState(copiedState);
      }
    }, {
      key: 'endResetValidation',
      value: function endResetValidation() {
        var currentPosition = this.state.currentCard;
        if (currentPosition + 1 >= this.state.cards.length) {
          console.log('current position', currentPosition);
          var copiedState = Object.assign({}, this.state);
          copiedState.summary = true;
          this.setState(copiedState);
          return;
        } else if (currentPosition + 1 >= 10) {
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
    }, {
      key: 'markCorrect',
      value: function markCorrect() {
        var card = this.state.cards[this.state.currentCard];
        this.state.sessionCorrectCount += 1;
        console.log('correct count', card.correctCount);
        FC.UserData.incrementCorrectCountOnCard(this.props.params.setId, card.id, function () {});

        this.endResetValidation();
      }
    }, {
      key: 'markIncorrect',
      value: function markIncorrect() {
        var card = this.state.cards[this.state.currentCard];
        this.state.sessionIncorrectCount += 1;
        FC.UserData.incrementIncorrectCountOnCard(this.props.params.setId, card.id, function () {});

        this.endResetValidation();
      }
    }, {
      key: 'quizRestart',
      value: function quizRestart() {

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
    }, {
      key: 'canvasLoad',
      value: function canvasLoad() {}
    }, {
      key: 'skipCard',
      value: function skipCard() {
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
        } else if (currentPosition + 1 >= 10) {
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
    }, {
      key: 'render',
      value: function render() {
        var _this3 = this;

        var cardShower;
        var cardNavigation;
        var quizSummary;

        if (this.state.summary === true) {

          quizSummary = React.createElement(
            'div',
            null,
            React.createElement(
              'h2',
              null,
              'Summary'
            ),
            React.createElement(
              'p',
              null,
              'Correct: ',
              this.state.sessionCorrectCount
            ),
            React.createElement(
              'p',
              null,
              'Incorrect: ',
              this.state.sessionIncorrectCount
            ),
            React.createElement(
              'p',
              null,
              'Skipped: ',
              this.state.skipped
            ),
            React.createElement(FC.GraphComponent, { correct: this.state.sessionCorrectCount, incorrect: this.state.sessionIncorrectCount, skipped: this.state.skipped }),
            React.createElement(
              'ul',
              { className: 'label' },
              React.createElement(
                'li',
                null,
                'Correct'
              ),
              React.createElement(
                'li',
                { className: 'label-li-two' },
                'Incorrect'
              ),
              React.createElement(
                'li',
                { className: 'label-li-three' },
                'Skipped'
              )
            ),
            React.createElement(
              'p',
              { className: 'p-button', onClick: function onClick() {
                  _this3.quizRestart();
                } },
              'Quiz Restart'
            ),
            React.createElement(
              'p',
              { className: 'p-button', onClick: function onClick() {
                  _this3.quizRestart();ReactRouter.browserHistory.goBack();
                } },
              'Back to set list'
            )
          );
        } else if (this.state.cards !== undefined && this.state.cards.length > 0) {
          var currentCard = this.state.cards[this.state.currentCard];
          var textToShow = this.state.showFront ? currentCard.front : currentCard.back;

          cardShower = React.createElement(
            'div',
            null,
            React.createElement(
              'div',
              null,
              'Card count: ',
              this.state.cards.length
            ),
            React.createElement(
              'div',
              { className: 'card', onClick: function onClick(evt) {
                  _this3.cardClicked(evt);
                } },
              textToShow
            )
          );

          cardNavigation = React.createElement(
            'div',
            { className: 'card-navigation' },
            React.createElement(
              'div',
              { className: 'correct', onClick: function onClick() {
                  _this3.markCorrect();
                } },
              'Correct'
            ),
            React.createElement(
              'div',
              { className: 'incorrect', onClick: function onClick() {
                  _this3.markIncorrect();
                } },
              'Incorrect'
            ),
            React.createElement(
              'div',
              { onClick: function onClick() {
                  _this3.skipCard();
                } },
              'Skip'
            )
          );
        }

        return React.createElement(
          'div',
          { className: 'quizzer' },
          React.createElement(
            'h1',
            null,
            'The Quizzer'
          ),
          quizSummary,
          cardShower,
          cardNavigation
        );
      }
    }]);

    return QuizzerComponent;
  }(React.Component);

  FC.QuizzerComponent = QuizzerComponent;
})();
//# sourceMappingURL=QuizzerComponent.js.map
