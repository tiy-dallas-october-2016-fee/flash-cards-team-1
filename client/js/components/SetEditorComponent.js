if (window.FC === undefined) { window.FC = {}; }

(function() {

  class SetEditorComponent extends React.Component {

    constructor() {
      super();
      this.state = {}
    }

    submitSet(evt) {
      evt.preventDefault();
      var makeAjaxCall = true;

      if (this.nameInput.value === '') {
        makeAjaxCall = false;
        console.log("met 1");
        this.setState({
          nameInvalid: true
        });
      }
      else {
        console.log("met 1 else");
        this.setState({
          nameInvalid: false
        });
      }

      if (this.descriptionTextarea.value === '') {
        makeAjaxCall = false;
        console.log('met 2');
        this.setState({
          textAreaInvalid: true
        });
      }
      else {
        console.log('met 2 else');
        this.setState({
          textAreaInvalid: false
        });
      }

      if (makeAjaxCall) {
        $.ajax({
          url: '/api/sets',
          method: 'POST',
          data: {
            name: this.nameInput.value,
            description: this.descriptionTextarea.value
          }
        })
        .done((data) => {
          ReactRouter.browserHistory.goBack();
        });
      }


    }

    render() {
      console.log(this.state);
      var nameInputClass = '';
      if (this.state.nameInvalid) {
        console.log('name is invalid');
        nameInputClass = 'invalid';
      }

      var descriptionTextareaClass = '';
      if (this.state.textAreaInvalid) {
        descriptionTextareaClass = 'invalid';

      }

      return <div className="set-editor">
        <h2>Set Editor</h2>

        <form onSubmit={(evt) => { this.submitSet(evt); }}>

          <input className={nameInputClass} placeholder="name" ref={(input) => { this.nameInput = input; }} />

          <textarea className={descriptionTextareaClass} placeholder="description" ref={(textarea) => { this.descriptionTextarea = textarea; }} />

          <button>Save</button>
        </form>
      </div>
    }

  }

  FC.SetEditorComponent = SetEditorComponent;

})();
