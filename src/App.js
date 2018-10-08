import React, { Component } from 'react';

import firebase, { db } from './Config/Firebase';
import Input from './Components/Input';
import Navigation from './Components/Navigation'
import TaskShow from './Components/TaskShow';
import Navbar from './Components/Navbar';
import Category from './Components/Category';
import Calendar from './Components/Calendar';
import History from './Components/History';
import ShowButton from './Components/ShowButton';


import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.min.css';
import update from 'immutability-helper';
import './App.css';

const itemRef = db.collection('planTasks')

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      items: [],
      itemsHistory: [],
      Category: [],
      page: 'งาน',
      menu: 'ลบงาน',
      show: 'กำลังทำ',
    }
  }

  componentDidMount() {
    this.queryTask()
    this.queryHistory()
    console.log(new Date())
  }

  // input
  addItem = (Task) => {
    var { items } = this.state
    var self = this

    var s = moment(Task.startAt.toDateString()).format('YYYY-MM-DD');
    var e = moment(Task.endAt.toDateString()).format('YYYY-MM-DD');
    var TaskDate = {
      name: Task.name,
      startAt: s,
      endAt: e,
      content: Task.content,
      isDone: Task.isDone,
      id: Task.id
    }
    const updateTask = update(items, { $push: [TaskDate] })
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
    this.onSortItems(editItem)
    itemRef.doc(id).set({
      name: item.name,
      content: item.content,
      startAt: new Date(item.startAt),
      endAt: new Date(item.endAt)
    }, { merge: true });
  };

  deleteItem = (id) => {
    if (this.state.page === 'งาน') {
      let { items } = this.state
      var index = this.state.items.findIndex(item => item.id === id)
      //console.log(this.state.items,'before')
      //console.log(index,'index')
      items.splice(index, 1)
      this.setState({ items })
      itemRef.doc(id).delete()
    }
    else {
      let { itemsHistory } = this.state
      var index = this.state.itemsHistory.findIndex(item => item.id === id)
      //console.log(this.state.items,'before')
      //console.log(index,'index')
      itemsHistory.splice(index, 1)
      this.setState({ itemsHistory })
      itemRef.doc(id).delete()
    }
  };


  // onArrayUpdate(id, item) {
  //   var ItemUp = this.state.items.find(item => item.id === id)

  //   // console.log(this.state.items, 'update before')
  //   // console.log(ItemUp, 'ItemUp');
  //   var temp = this.state.items


  //   var index = temp.findIndex(ref => ref.id === id)
  //   item.startAt.toDateString()
  //   var s = moment(item.startAt.toDateString()).format('YYYY-MM-DD');
  //   var e = moment(item.endAt.toDateString()).format('YYYY-MM-DD');
  //   console.log(s, 'New StartDate')
  //   console.log(e, 'New endDate')


  //   temp[index].name = item.name
  //   temp[index].content = item.content
  //   temp[index].startAt = s
  //   temp[index].endAt = e

  //   //console.log(temp, 'after')
  //   var itemSort = temp.sort(function (x, y) {
  //     var a = new Date(x.startAt);
  //     var b = new Date(y.startAt);
  //     return a - b;
  //   })
  //   console.log(itemSort, 'sortแล้วจ้า');
  //   this.setState({
  //     items: itemSort
  //   });
  // };

  queryTask = () => {
    var items = []
    var self = this
    const queryRef = itemRef.where('isDone', '==', false)
    queryRef.get()
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

  queryHistory = () => {
    var items = []
    var self = this
    const queryRef = itemRef.where('isDone', '==', true)
    queryRef.get()
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
        self.onSortItemsDone(items)
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

      return a - b;
    });

    this.setState({
      items: itemsSort
    })
  };

  onSortItemsDone = (items) => {
    var itemsSort = items.sort(function (x, y) {
      var a = new Date(x.startAt);
      var b = new Date(y.startAt);

      return a - b;
    });

    this.setState({
      itemsHistory: itemsSort
    })
  };

  taskDone = (value) => {
    let { items, itemsHistory } = this.state
    var index = this.state.items.findIndex(item => item.id === value.id)
    //console.log(this.state.items,'before')
    //console.log(index,'index')

    items.splice(index, 1)
    var updateHistory = update(itemsHistory, { $push: [value] })

    this.onSortItemsDone(updateHistory)
    this.setState({ items })

    itemRef.doc(value.id).set({
      isDone: true
    }, { merge: true })
  };

  taskBack = (value) => {
    let { items, itemsHistory } = this.state
    var index = this.state.itemsHistory.findIndex(item => item.id === value.id)
    //console.log(this.state.items,'before')
    //console.log(index,'index')

    itemsHistory.splice(index, 1)
    var updateTask = update(items, { $push: [value] })

    this.onSortItems(updateTask)
    this.setState({ itemsHistory })

    itemRef.doc(value.id).set({
      isDone: false
    }, { merge: true })
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

  changeShow = (show) => {
    this.setState({
      show: show
    })
  };

  renderpage = () => {
    switch (this.state.page) {
      case 'งาน':
        return (
          <div>

            <ShowButton
              {...this.state}
              changeShow={this.changeShow}

            />

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
              taskDone={this.taskDone}
              taskBack={this.taskBack}
            />

          </div>
        );
      case 'ประวัติ':
        return (
          <div>

            <History
              {...this.state}
              deleteItem={this.deleteItem}
              editItem={this.editItem}
              taskBack={this.taskBack}
            />

          </div>
        );
      case 'ปฏิทิน':
        return (
          <div>

            <Calendar

              {...this.state}
            />

          </div>
        );
    }
  }

  render() {
    return (
      <div class="App">

        <Navbar
          handleDrawerOpen={this.handleDrawerOpen}
          changeMenu={this.changeMenu}
          {...this.state}
        />

        <Category
          handleDrawerOpen={this.handleDrawerOpen}
          open={this.state.open}
        />

        <br /><br /><br />

        {this.renderpage()}

        <br /><br /><br />

        <Navigation
          changePage={this.changePage}
        />

      </div>
    )
  }
}

export default App;