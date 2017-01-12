if (window.FC === undefined) { window.FC = {}; }

(function() {

  class SetListComponent extends React.Component {

    constructor() {
      super();

      this.state = {
        sets: [],
        sortBy: 'name'
      }
    }

    componentDidMount() {
      this.loadSets();
    }

    loadSets() {
      FC.UserData.loadSets((data) => {
        this.setState({
          sets: data.sets,
          sortBy: this.state.sortBy
        });
      });
    }

    nameSorting(){
      var clonedArray = this.state.sets.slice(0);
      clonedArray = clonedArray.sort((a, b) => {return a.name > b.name; });

      this.setState({
        sets: clonedArray,
        sortBy: 'name'
      })
    }

    cardSorting(){
      var clonedArray = this.state.sets.slice(0);
      clonedArray = clonedArray.sort((a, b) => {return a.cards.length < b.cards.length; });

      this.setState({
        sets: clonedArray,
        sortBy: 'cardCount'
      })
    }

    deleteSet(setId) {
      $.ajax({
        url: '/api/sets/' + setId,
        method: 'DELETE'
      })
      .done(() => {
        this.loadSets();
      });
    }

    addCards(setId) {
      ReactRouter.hashHistory.push('/set/' + setId);
    }

    navigateToQuiz(setId) {
        ReactRouter.hashHistory.push('/set/' + setId + '/quizzer');
   }

    render() {
      console.log('SetList.render', this.state);

      var noSetsMessaging;
      if (this.state.sets.length === 0) {
        noSetsMessaging = <p>You do not have any sets! Create one.</p>
      }

      var theSortingHat = 'sorting';
      if (this.state.sortBy === 'name') {
        theSortingHat += 'by-name';
      } else {
        theSortingHat += 'by-count'
      }

      return <div className="set-list">
        <h2>Set List</h2>

        {noSetsMessaging}

        <ReactRouter.Link to="/create-set">Create new set</ReactRouter.Link>

        <div className={theSortingHat}>
          <div className="by-name" onClick={() => this.nameSorting() }>By Name</div>
          <div className="by-card-count" onClick={() => this.cardSorting() }>By # of Cards</div>
        </div>

        <ul>
        {this.state.sets.map((set, index) => {
          var noCardsMessaging;
          if (set.cards.length > 0) {
            noCardsMessaging = <div className="button quiz" onClick={() => {this.navigateToQuiz(set.id, set.cards.length)}}>quiz</div>
          }
          return <li key={set.id} className="set">
            <div className="set-name">{set.name}</div>
            <div className="number-of-cards"># of cards: {set.cards.length}</div>
            <p>{set.description}</p>

            <div className="button delete-set" onClick={() => {this.deleteSet(set.id)}}>delete</div>
            <div className="button add-cards" onClick={() => {this.addCards(set.id)}}>add cards</div>

            {noCardsMessaging}
          </li>
        })}
        </ul>
      </div>;
    }
  }

  FC.SetListComponent = SetListComponent;
})();
