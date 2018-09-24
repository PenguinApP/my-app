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
import update from 'immutability-helper';

const itemRef = db.collection('planTasks')

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      items: [],
      Category: [],
      page: 'งาน',
      menu: 'ลบงาน',
    }
  }
  componentDidMount() {
    this.queryTask()
  }
  
  // input
  addItem = (Task) => {
    var { items } = this.state
    var self = this
    const updateTask = update(items, { $push: [Task] })
    itemRef
      .add(Task)
      .then(function (docRef) {
        const TaskLength = updateTask.length
        const id = docRef.id
        updateTask[TaskLength - 1].id = id
        self.onSortItems(updateTask)
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
  };

  editItem = (item, index) => {
    const { items } = this.state
    const id = item.id
    const editIndex = items.findIndex(item => item.id === id)
    const editItem = update(items, { [editIndex]: { $set: item } })
    this.setState({ items: editItem })
    itemRef.doc(id).set({
      name: item.name,
      content: item.content,
      startAt: new Date(item.startAt),
      endAt: new Date(item.endAt)
    }, { merge: true });
  };

  deleteItem = (id) => {
    let { items } = this.state
    var index = this.state.items.findIndex(item => item.id === id)
    //console.log(this.state.items,'before')
    //console.log(index,'index')
    items.splice(index, 1)
    this.setState({ items })
    itemRef.doc(id).delete()
  };

  onArrayUpdate(id, item) {
    var ItemUp = this.state.items.find(item => item.id === id)

    // console.log(this.state.items, 'update before')
    // console.log(ItemUp, 'ItemUp');
    var temp = this.state.items


    var index = temp.findIndex(ref => ref.id === id)
    item.startDate.toDateString()
    var s = moment(item.startDate.toDateString()).format('YYYY-MM-DD');
    var e = moment(item.endDate.toDateString()).format('YYYY-MM-DD');
    console.log(s, 'New StartDate')
    console.log(e, 'New endDate')


    temp[index].destask = item.destask
    temp[index].taskName = item.taskName
    temp[index].description = item.description
    temp[index].startDate = s
    temp[index].endDate = e
    temp[index].picture = item.picture

    //console.log(temp, 'after')
    var itemSort = temp.sort(function (x, y) {
      var a = new Date(x.startDate);
      var b = new Date(y.startDate);
      return a - b;
    })
    console.log(itemSort, 'sortแล้วจ้า');
    this.setState({
      items: itemSort
    });
  };

  queryTask = () => {
    var items = []
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
  };

  onSortItems = (items) => {
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
  };

  handleDrawerOpen = (open) => {
    this.setState({
      open: open
    });
    console.log(open, 'Drawer')
  };

  changePage = (page) => {
    this.setState({
      page: page
    })
    console.log('Page', page)
  };

  changeMenu = (menu) => {
    this.setState({
      menu: menu
    })
    console.log('menu', menu)
  };

  renderpage = () => {
    switch (this.state.page) {
      case 'งาน':
        return (
          <div className="App">

            <Input
              items={this.state.items}
              addItem={this.addItem}
            />

            <TaskShow
              {...this.state}
              handleEditOpen={this.handleEditOpen}
              editItem={this.editItem}
              deleteItem={this.deleteItem}
              onArrayUpdate={this.onArrayUpdate}
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
              {...this.state}
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
          changeMenu={this.changeMenu}
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