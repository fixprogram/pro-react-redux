import React, { Component } from "react";

import "./ItemStatusFilter.css";

export default class ItemStatusFilter extends Component {
  render() {
    const { onChangeType, type } = this.props;

    const buttons = [
      {
        id: 1,
        label: "All",
      },
      {
        id: 2,
        label: "Active",
      },
      {
        id: 3,
        label: "Done",
      },
    ];
    return (
      <div className="btn-group">
        {buttons.map((btn) => {
          return (
            <button
              key={btn.id}
              type="button"
              className={`btn ${
                type === btn.label ? "btn-info" : "btn-outline-secondary"
              }`}
              onClick={() => onChangeType(btn.label)}
            >
              {btn.label}
            </button>
          );
        })}
      </div>
    );
  }
}
