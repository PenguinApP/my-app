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
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.min.css';

const itemRef = db.collection('planTasks')

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

    var { items } = this.state
    items.push(Task)

    console.log(Task, 'itemsApp')


    itemRef.add(Task);
    this.onSortItems(items)
  }

  componentDidMount() {
    var { items } = this.state
    var self = this
    itemRef.get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          var isd = new Date(doc.data().startAt.toDate());
          var ied = new Date(doc.data().endAt.toDate());
          var Bes = isd.toDateString();
          var Bee = ied.toDateString();
          var sdstring = moment(Bes).format('YYYY-MM-DD');
          var edstring = moment(Bee).format('YYYY-MM-DD');
          items.push({
            isDone: doc.data().isDone,
            content: doc.data().content,
            startAt: sdstring,
            endAt: edstring,
            name: doc.data().name,
            id: doc.id,
          })
          //console.log(doc.id, " => ", doc.data());
        });
        self.onSortItems(items)
      })
      .catch(function (error) {
        3
        console.log("Error getting documents: ", error);
      });
  }

  onSortItems(items) {
    var itemsSort = items.sort(function (x, y) {
      var a = new Date(x.startAt);
      var b = new Date(y.startAt);
      console.log(a);
      console.log(b);

      return a - b;
    });
    console.log(itemsSort)
    this.setState({
      items: itemsSort
    })
  }

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