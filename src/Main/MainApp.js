import React, { Component } from "react";
import "../Main/Dialog.css";
import videos from "../videos/tvideo.mp4";

export default class Dialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      diffX: 0,
      diffY: 0,
      dragging: false,
      styles: {},
    };

    this._dragStart = this._dragStart.bind(this);
    this._dragging = this._dragging.bind(this);
    this._dragEnd = this._dragEnd.bind(this);
  }

  _dragStart(e) {
    this.setState({
      diffX: e.screenX - e.currentTarget.getBoundingClientRect().left,
      diffY: e.screenY - e.currentTarget.getBoundingClientRect().top,
      dragging: true,
    });
  }

  _dragging(e) {
    if (this.state.dragging) {
      var left = e.screenX - this.state.diffX;
      var top = e.screenY - this.state.diffY;

      this.setState({
        styles: {
          left: left,
          top: top,
        },
      });
    }
  }

  _dragEnd() {
    this.setState({
      dragging: false,
    });
  }

  render() {
    return (
      <div
        className="Dialog"
        style={this.state.styles}
        onMouseDown={this._dragStart}
        onMouseMove={this._dragging}
        onMouseUp={this._dragEnd}
      >
        <video
          width="320"
          height="240"
          controls
          onMouseOver={(event) => event.target.play()}
          onMouseOut={(event) => event.target.pause()}
          dragging={(event) => event.target.pause()}
          onDragStart={(event) => event.target.pause()}
        >
          <source src={videos} type="video/mp4" />
        </video>
      </div>
    );
  }
}
