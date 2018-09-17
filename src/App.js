import React, { Component } from 'react';

import firebase, { db } from './Config/Firebase';
import Input from './Components/Input';
import Navigation from './Components/Navigation'

import './App.css';
import TaskShow from './Components/TaskShow';
import Navbar from './Components/Navbar';
import Category from './Components/Category';
import Calendar from './Components/Calendar';
import History from './Components/History';
import TaskEdit from './Components/TaskEdit';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      items: [],
      Category: [],
      open: false,
      openEdit: false,
      page: 'งาน',
    }
    this.addItem = this.addItem.bind(this);
    this.changePage = this.changePage.bind(this);
    this.renderpage = this.renderpage.bind(this);
    this.handleEditOpen = this.handleEditOpen.bind(this);
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
  }

  // input
  addItem(Task) {


    this.setState({
      items: Task
    })
    console.log(Task, 'itemsApp')

    var itemRef = db.collection('planTasks');
    var items = {
      Task
    }

    itemRef.add(items);
  }

  showItem(){

  };



  // categoryOpen
  handleDrawerOpen = (open) => {
    this.setState({
      open: open
    });
    console.log(open, 'Drawer')
  };
  // editOpen
  handleEditOpen(open, value) {
    this.setState({
      openEdit: open,
    })
    console.log(value, 'itemsTaskshow')
  }

  changePage(page) {
    this.setState({
      page: page
    })
    console.log('Page', page)
  }



  renderpage() {
    switch (this.state.page) {
      case 'งาน':
        return (
          <div className="App">

            <Input
              items={this.state.items}
              addItem={this.addItem} />

            <TaskShow
              items={this.state.items}
              openEdit={this.state.openEdit}
              handleEditOpen={this.handleEditOpen}
            />



          </div>
        );
      case 'ประวัติ':
        return (
          <div className="App">

            <History
            />

          </div>
        );
      case 'ปฏิทิน':
        return (
          <div className="App">

            <Calendar
              items={this.state.items}
            />

          </div>
        );
    }
  }

  render() {
    return (
      <div>
        <Navbar
          handleDrawerOpen={this.handleDrawerOpen}
          {...this.state} />

        <Category
          handleDrawerOpen={this.handleDrawerOpen}
          open={this.state.open} />

        {this.renderpage()}

        <Navigation
          changePage={this.changePage} />

      </div>
    )
  }
}

export default App;