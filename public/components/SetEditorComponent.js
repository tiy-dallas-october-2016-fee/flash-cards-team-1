"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

if (window.FC === undefined) {
  window.FC = {};
}

(function () {
  var SetEditorComponent = function (_React$Component) {
    _inherits(SetEditorComponent, _React$Component);

    function SetEditorComponent() {
      _classCallCheck(this, SetEditorComponent);

      var _this = _possibleConstructorReturn(this, (SetEditorComponent.__proto__ || Object.getPrototypeOf(SetEditorComponent)).call(this));

      _this.state = {};
      return _this;
    }

    _createClass(SetEditorComponent, [{
      key: "submitSet",
      value: function submitSet(evt) {
        evt.preventDefault();
        var makeAjaxCall = true;

        if (this.nameInput.value === '') {
          makeAjaxCall = false;
          console.log("met 1");
          this.setState({
            nameInvalid: true
          });
        } else {
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
        } else {
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
          }).done(function (data) {
            ReactRouter.browserHistory.goBack();
          });
        }
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;

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

        return React.createElement(
          "div",
          { className: "set-editor" },
          React.createElement(
            "h2",
            null,
            "Set Editor"
          ),
          React.createElement(
            "form",
            { onSubmit: function onSubmit(evt) {
                _this2.submitSet(evt);
              } },
            React.createElement("input", { className: nameInputClass, placeholder: "name", ref: function ref(input) {
                _this2.nameInput = input;
              } }),
            React.createElement("textarea", { className: descriptionTextareaClass, placeholder: "description", ref: function ref(textarea) {
                _this2.descriptionTextarea = textarea;
              } }),
            React.createElement(
              "button",
              null,
              "Save"
            )
          )
        );
      }
    }]);

    return SetEditorComponent;
  }(React.Component);

  FC.SetEditorComponent = SetEditorComponent;
})();
//# sourceMappingURL=SetEditorComponent.js.map
