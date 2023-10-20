import './App.css';
import 'dracula-ui/styles/dracula-ui.css'
import { Paragraph, Box, Checkbox, Button, Heading, Text, Input, Divider } from 'dracula-ui'
import React, { Component, useState } from 'react';

function App() {

  class TodoList extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        key: 0,
        newTodo: "",
        search: "",
        doneCount: 0,
      }

      let storageArray = JSON.parse(localStorage.getItem("data"));
      if (storageArray == null) {
        storageArray = {};
        storageArray["todos"] = {};
        localStorage.setItem("data", JSON.stringify(storageArray))
      }
      if (localStorage.getItem("firstRun") == null) {
        let storageArray = JSON.parse(localStorage.getItem("data"));
        storageArray["todos"] = {
          1: { "title": "Checkboxes", "state": true },
          2: { "title": "Ordre des To Do", "state": false },
          3: { "title": "Supression des To Do", "state": true },
          4: { "title": "Recherche des To Do", "state": true },
          5: { "title": "Progression des To Do", "state": true },
          6: { "title": "Ajout des To Do", "state": true },
          7: { "title": "Pop up pour l'ajout des todo", "state": false },
          8: { "title": "Fait avec <3", "state": true }
        };
        localStorage.setItem("data", JSON.stringify(storageArray));
        localStorage.setItem("firstRun", "nop, it has been launched before");
      }
      this.updateSearch = this.updateSearch.bind(this);
      this.updateInput = this.updateInput.bind(this);
      this.addToList = this.addToList.bind(this);
      this.removeFromList = this.removeFromList.bind(this);
      this.toggle = this.toggle.bind(this);
    }

    addToList() {
      this.state.key += 1
      let storageArray = JSON.parse(localStorage.getItem("data"));
      storageArray["todos"][this.state.key] = { "title": this.state.newTodo, "state": false };
      localStorage.setItem("data", JSON.stringify(storageArray))
      this.forceUpdate();
    }

    removeFromList(key) {
      let todos = JSON.parse(localStorage.getItem("data"))["todos"];
      delete todos[key];
      localStorage.setItem("data", JSON.stringify({ "todos": todos }));
      this.setState({ key: this.state.key })
      this.forceUpdate();
    }

    toggle(key) {
      let todos = JSON.parse(localStorage.getItem("data"))["todos"];
      todos[key]["state"] = !todos[key]["state"];
      localStorage.setItem("data", JSON.stringify({ "todos": todos }));
      this.setState({ doneCount: 0 })
    }

    updateInput(event) {
      this.setState({ newTodo: event.target.value });
    }

    updateSearch(event) {
      this.setState({ search: event.target.value });
    }

    render() {
      let storageArray = JSON.parse(localStorage.getItem("data"));
      const displaylist = [];
      let done = 0;
      let total = 0;
      for (let key in storageArray["todos"]) {
        key = parseInt(key);
        let todo = storageArray["todos"][key];
        if (todo["state"]) done += 1
        total += 1;
        let todoHtml =
          <div class="todo">
            <Box>
              <Checkbox id="normal" name="normal" color="purple" defaultChecked={todo["state"]} onChange={() => this.toggle(key)} />
              <label htmlFor="normal" className="drac-text drac-text-white">
                <Text size="lg" color="pink">{todo["title"]}</Text>
              </label>
            </Box>
            <Button color="purple" onClick={() => this.removeFromList(key)}>Supprimer</Button>
            <br />
          </div>;
        <Divider />;
        this.state.key = key;
        if (todo["title"].includes(this.state.search)) displaylist.push(todoHtml);
      }

      return (
        <>
          <br />
          <header>
            <Text align="center" as="p">{done} tache(s) effectuee sur {total}</Text>
          </header>
          <br />
          <Box display='inline-grid' scrollbar={true} height="full">
            {displaylist}
          </Box>
          <div>
            <Box display='inline-grid' width='sm'>
              <Input display='inline' width='sm' type='search' placeholder='rechercher' onChange={this.updateSearch}></Input>
              <br />
              <br />
              <Input type='text' size="lg" placeholder='Nouvelle Tache' onChange={this.updateInput}></Input>
              <br />
              <Button color="purple" onClick={this.addToList}>ajouter</Button>
            </Box>
            <br />
            <br />
          </div>
        </>
      );
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <Heading size="2xl" color="pink">SimpleTodoList</Heading>
        <br />
        <Heading size="xl" color="purpleCyan">Pourquoi faire compliqué quand on peut faire simple</Heading>
      </header>
      <Box display='inline' scrollbar={true} height="full">
        <TodoList />
      </Box>
    </div>
  );
}

export default App;
