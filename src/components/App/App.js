import React, { Component } from "react";

import AppHeader from "../AppHeader";
import SearchPanel from "../SearchPanel";
import TodoList from "../TodoList";
import ItemStatusFilter from "../ItemStatusFilter";

import "./App.css";

export default class App extends Component {
  state = {
    todoData: [
      {
        id: 1,
        label: "Drink Coffee",
        important: false,
      },
      {
        id: 2,
        label: "Make awesome app",
        important: true,
      },
      {
        id: 3,
        label: "Have a lunch",
        important: false,
      },
    ],
  };

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);

      const newArray = [
        ...todoData.splice(0, idx),
        ...todoData.splice(idx + 1),
      ];

      return {
        todoData: newArray,
      };
    });
  };

  render() {
    return (
      <div className="App">
        <AppHeader toDo={1} done={3} />
        <div className="top-panel d-flex">
          <SearchPanel />
          <ItemStatusFilter />
        </div>

        <TodoList todos={this.state.todoData} onDeleted={this.deleteItem} />
      </div>
    );
  }
}
