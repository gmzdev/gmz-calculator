import * as React from "react";
import { Row, Button } from "reactstrap";
export class Layout extends React.Component {
  constructor() {
    super();

    this.state = {
      current: "0",
      operationMemories: ["0"],
      previousOperations: [],
      evaluate: "0",
      equalPress: false
    };
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  percentButtonHandler = e => {
    let current = this.state.current;
    let operationMemories = this.state.operationMemories;

    console.log(this.hasOperator(current[0]));

    if (this.hasOperator(current[0])) {
      let value = current.slice(1, current.length);
      value = value + "/100";
      value = eval(value.replace("÷", "/"));
      current = current[0] + value;
    } else {
      current = current + "/100";
      current = eval(current.replace("÷", "/"));
    }

    operationMemories[operationMemories.length - 1] = current.toString();

    this.setState({ current, operationMemories });
  };

  numberButtonHandler = e => {
    let current = this.state.current;
    let operationMemories = this.state.operationMemories;
    current =
      current === "0"
        ? e.target.getAttribute("data-value")
        : current + e.target.getAttribute("data-value");
    operationMemories[operationMemories.length - 1] = current;

    let joinedOperations = operationMemories.join("");
    let evaluate = eval(joinedOperations.replace("x", "*"));
    this.setState({ current, operationMemories, evaluate });
  };

  backspaceButtonHandler = e => {
    let current = this.state.current;
    let operationMemories = this.state.operationMemories;
    let currentSplit = current.split("");
    current = currentSplit.slice(0, currentSplit.length - 1);
    let result = current.join("");

    console.log(this.hasOperator(current[0]));

    if (this.hasOperator(current[0])) {
      operationMemories[operationMemories.length - 1] =
        result.length === 1 ? current[0] + "0" : result;
    } else {
      operationMemories[operationMemories.length - 1] =
        result.length === 0 ? "0" : result;
    }

    let joinedOperations = operationMemories.join("");
    let evaluate = eval(joinedOperations.replace("x", "*"));
    this.setState({
      current: result,
      operationMemories,
      evaluate
    });
  };

  operationButtonHandler = e => {
    let operation = e.target.getAttribute("data-value");
    let current = this.state.current;
    let operationMemories = this.state.operationMemories;

    if (operation === "=") {
      let previousOperations = this.state.previousOperations;
      operationMemories.push(operation + this.state.evaluate);

      previousOperations.push(
        operationMemories.filter(m => m !== "").join(",")
      );
      this.setState({
        current: "0",
        operationMemories: ["0"],
        previousOperations,
        evaluate: "0"
      });
    } else {
      operationMemories.push(operation);
      this.setState({
        current: operation,
        operationMemories
      });
    }
  };

  clearButtonHandler = e => {
    if (
      e.target.getAttribute("data-value").toUpperCase() === "ac".toUpperCase()
    ) {
      this.setState({
        current: "0",
        operationMemories: ["0"]
      });
    }

    if (
      e.target.getAttribute("data-value").toUpperCase() === "c".toUpperCase()
    ) {
      let current = this.state.current;
      let operationMemories = this.state.operationMemories;
      current = "0";
      operationMemories[operationMemories.length - 1] = current;
      this.setState({
        current,
        operationMemories
      });
    }
  };

  scrollToBottom() {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }

  hasOperator(val) {
    return ["+", "-", "x", "÷"].indexOf(val) > -1;
  }

  render() {
    let fillerCount =
      5 -
      (this.state.previousOperations.length +
        this.state.operationMemories.length);
    let filler = [];

    for (let x = 0; x < fillerCount; x++) {
      filler.push(
        <li key={"filler" + x} className="list-group-item border-0" />
      );
    }

    return (
      <div className="container">
        <div className="row res">
          <div className="col">
            <div className="border">
              <ul className="list-group border-0">
                {filler.map(f => f)}
                {this.state.previousOperations.map((v, i) => (
                  <li key={i} className="list-group-item border-0">
                    {v.replace("/", "÷").split(",")}
                  </li>
                ))}
                {this.state.operationMemories.map((v, i) => (
                  <li key={i} className="list-group-item border-0">
                    {v.replace("/", "÷")}
                  </li>
                ))}
                <li
                  className="list-group-item border-0"
                  style={{
                    float: "left",
                    clear: "both",
                    fontSize: "12px",
                    color: "gray"
                  }}
                  ref={el => {
                    this.messagesEnd = el;
                  }}
                >
                  {"=" + this.state.evaluate}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col pr-0">
            <button
              className="btn btn-light rounded-0 ac"
              onClick={this.clearButtonHandler}
              data-value="ac"
            >
              AC
            </button>
          </div>
          <div className="col pr-0 pl-0">
            <button
              className="btn btn-light rounded-0"
              onClick={this.backspaceButtonHandler}
            >
              &#8592;
            </button>
          </div>
          <div className="col pr-0 pl-0">
            <button
              className="btn btn-light rounded-0"
              onClick={this.percentButtonHandler}
            >
              %
            </button>
          </div>
          <div className="col pl-0">
            <button
              className="btn btn-light rounded-0"
              data-value="/"
              onClick={this.operationButtonHandler}
            >
              &#xf7;
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col pr-0">
            <button
              className="btn btn-light rounded-0"
              data-value="7"
              onClick={this.numberButtonHandler}
            >
              7
            </button>
          </div>
          <div className="col pr-0 pl-0">
            <button
              className="btn btn-light rounded-0"
              data-value="8"
              onClick={this.numberButtonHandler}
            >
              8
            </button>
          </div>
          <div className="col pr-0 pl-0">
            <button
              className="btn btn-light rounded-0"
              data-value="9"
              onClick={this.numberButtonHandler}
            >
              9
            </button>
          </div>
          <div className="col pl-0">
            <button
              className="btn btn-light rounded-0"
              data-value="x"
              onClick={this.operationButtonHandler}
            >
              &#215;
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col pr-0">
            <button
              className="btn btn-light rounded-0"
              data-value="4"
              onClick={this.numberButtonHandler}
            >
              4
            </button>
          </div>
          <div className="col pr-0 pl-0">
            <button
              className="btn btn-light rounded-0"
              data-value="5"
              onClick={this.numberButtonHandler}
            >
              5
            </button>
          </div>
          <div className="col pr-0 pl-0">
            <button
              className="btn btn-light rounded-0"
              data-value="6"
              onClick={this.numberButtonHandler}
            >
              6
            </button>
          </div>
          <div className="col pl-0">
            <button
              className="btn btn-light rounded-0"
              data-value="-"
              onClick={this.operationButtonHandler}
            >
              -
            </button>
          </div>
        </div>
        <div className="row broder">
          <div className="col pr-0">
            <button
              className="btn btn-light rounded-0"
              data-value="1"
              onClick={this.numberButtonHandler}
            >
              1
            </button>
          </div>
          <div className="col pr-0 pl-0">
            <button
              className="btn btn-light rounded-0"
              data-value="2"
              onClick={this.numberButtonHandler}
            >
              2
            </button>
          </div>
          <div className="col pr-0 pl-0">
            <button
              className="btn btn-light rounded-0"
              data-value="3"
              onClick={this.numberButtonHandler}
            >
              3
            </button>
          </div>
          <div className="col pl-0">
            <button
              className="btn btn-light rounded-0"
              data-value="+"
              onClick={this.operationButtonHandler}
            >
              +
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col pr-0">
            <button
              className="btn btn-light rounded-0 c"
              onClick={this.clearButtonHandler}
              data-value="c"
            >
              C
            </button>
          </div>
          <div className="col pr-0 pl-0">
            <button
              className="btn btn-light rounded-0"
              data-value="0"
              onClick={this.numberButtonHandler}
            >
              0
            </button>
          </div>
          <div className="col pr-0 pl-0">
            <button
              className="btn btn-light rounded-0"
              data-value="."
              onClick={this.numberButtonHandler}
            >
              .
            </button>
          </div>
          <div className="col pl-0">
            <button
              className="btn btn-success rounded-0"
              data-value="="
              onClick={this.operationButtonHandler}
            >
              =
            </button>
          </div>
        </div>
      </div>
    );
  }
}
