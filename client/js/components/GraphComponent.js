if (window.FC === undefined) { window.FC = {}; }

(() => {

  class GraphComponent extends React.Component {
    componentDidMount() {
      this.createGraph()
    }


    createGraph() {

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

    render() {
      return <canvas width="300" height="210" ref={(dom) => { this.canvas = dom }}></canvas>;
    }
  }

  FC.GraphComponent = GraphComponent;

})()
