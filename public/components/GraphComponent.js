"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

if (window.FC === undefined) {
  window.FC = {};
}

(function () {
  var GraphComponent = function (_React$Component) {
    _inherits(GraphComponent, _React$Component);

    function GraphComponent() {
      _classCallCheck(this, GraphComponent);

      return _possibleConstructorReturn(this, (GraphComponent.__proto__ || Object.getPrototypeOf(GraphComponent)).apply(this, arguments));
    }

    _createClass(GraphComponent, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        this.createGraph();
      }
    }, {
      key: "createGraph",
      value: function createGraph() {

        var correct = this.props.correct * 20;
        var incorrect = this.props.incorrect * 20;
        var skipped = this.props.skipped * 20;

        var correctY = 210 - correct;
        var incorrectY = 210 - incorrect;
        var skippedY = 210 - skipped;

        var canvas = this.canvas;
        var context = canvas.getContext("2d");

        context.fillStyle = "#0f0";
        context.strokeRect(0, 0, 300, 210);
        context.fillRect(20, correctY, 50, correct);
        context.fillStyle = "#f00";
        context.fillRect(120, incorrectY, 50, incorrect);
        context.fillStyle = "#000";
        context.fillRect(220, skippedY, 50, skipped);
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;

        return React.createElement("canvas", { width: "300", height: "210", ref: function ref(dom) {
            _this2.canvas = dom;
          } });
      }
    }]);

    return GraphComponent;
  }(React.Component);

  FC.GraphComponent = GraphComponent;
})();
//# sourceMappingURL=GraphComponent.js.map
