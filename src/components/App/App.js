import React, { Component } from "react";

import AppHeader from "../AppHeader";
import SearchPanel from "../SearchPanel";
import TodoList from "../TodoList";
import ItemStatusFilter from "../ItemStatusFilter";
import ItemAddForm from "../ItemAddForm";

import "./App.css";

export default class App extends Component {
  max = 100;

  state = {
    todoData: [
      this.createTodoItem("Drink Coffee"),
      this.createTodoItem("Make awesome app"),
      this.createTodoItem("Have a lunch"),
    ],
    type: "Active",
    term: "",
  };

  createTodoItem(label) {
    return {
      id: this.max++,
      label,
      done: false,
      important: false,
    };
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);

      const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];

      return {
        todoData: newArray,
      };
    });
  };

  addItem = (text) => {
    this.setState(({ todoData }) => {
      const newItem = this.createTodoItem(text);
      const newArray = [...todoData, newItem];

      return {
        todoData: newArray,
      };
    });
  };

  toggleProperty = (id, arr, propName) => {
    const idx = arr.findIndex((el) => el.id === id);

    const oldItem = arr[idx];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };

    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  };

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(id, todoData, "done"),
      };
    });
  };

  onToggleImportant = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(id, todoData, "important"),
      };
    });
  };

  changeType = (newType) => {
    this.setState(({ type }) => {
      return {
        type: newType,
      };
    });
  };

  defineTodos = () => {
    switch (this.state.type) {
      case "Active":
        return this.state.todoData.filter((el) => el.done !== true);
      case "Done":
        return this.state.todoData.filter((el) => el.done === true);
      default:
        return this.state.todoData;
    }
  };

  search = (items, term) => {
    if (term === "") return items;
    return items.filter(
      (item) => item.label.toLowerCase().indexOf(term.toLowerCase()) > -1
    );
  };

  render() {
    const { todoData } = this.state;

    const doneCount = todoData.filter((el) => el.done === true).length;

    const todoCount = todoData.length - doneCount;

    const visibleItems = this.search(this.defineTodos(), this.state.term);

    return (
      <div className="App">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel onSearch={(value) => this.setState({ term: value })} />
          <ItemStatusFilter
            onChangeType={this.changeType}
            type={this.state.type}
          />
        </div>

        <TodoList
          todos={visibleItems}
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
        />
        <ItemAddForm onItemAdded={this.addItem} />
      </div>
    );
  }
}
