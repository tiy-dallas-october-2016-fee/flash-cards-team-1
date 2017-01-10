if (window.FC === undefined) { window.FC = {}; }

(function() {

  class CardEditorComponent extends React.Component {

    submitCard(evt) {
      evt.preventDefault();

      var cb = () => {
        ReactRouter.browserHistory.goBack();
      };

      FC.UserData.addCardToSet(this.props.params.setId, this.frontInput.value, this.backTextarea.value, cb);
    }

    addAnotherCard(evt) {
      evt.preventDefault();

      var cb = () => {
        this.frontInput.value = "";
        this.backTextarea.value = "";
      }

      FC.UserData.addCardToSet(this.props.params.setId, this.frontInput.value, this.backTextarea.value, cb);
    }

    render() {
      return <div className="card-editor">
        <h2>The Card Editor</h2>

        <form>

          <input placeholder="front" ref={(input) => {this.frontInput = input; }} />

          <textarea placeholder="back" ref={(textarea) => {this.backTextarea = textarea; }} />

          <button onClick={(evt) => { this.addAnotherCard(evt); }}>Add another card</button>

          <button onClick={(evt) => { this.submitCard(evt); }}>Done</button>

        </form>

      </div>;
    }

  }

  FC.CardEditorComponent = CardEditorComponent;

})();
