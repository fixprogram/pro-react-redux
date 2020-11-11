import React from "react";

import AppHeader from "../AppHeader";
import SearchPanel from "../SearchPanel";
import TodoList from "../TodoList";
import ItemStatusFilter from "../ItemStatusFilter";

import "./App.css";

const App = () => {
  const todoData = [
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
  ];

  return (
    <div className="App">
      <AppHeader toDo={1} done={3} />
      <div className="top-panel d-flex">
        <SearchPanel />
        <ItemStatusFilter />
      </div>

      <TodoList todos={todoData} />
    </div>
  );
};

export default App;
