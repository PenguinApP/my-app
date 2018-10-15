import React, { Component } from 'react';
import firebase, { db, auth } from './Config/Firebase';
import Input from './Components/Input';
import Navigation from './Components/Navigation'
import TaskShow from './Components/TaskShow';
import Navbar from './Components/Navbar';
import Category from './Components/Category';
import Calendar from './Components/Calendar';
import History from './Components/History';
import ShowButton from './Components/ShowButton';
import Login from './Components/Login';


import moment from 'moment';
import update from 'immutability-helper';
import './App.css';

const itemRef = db.collection('planTasks')

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      items: [],
      showItems: [],
      itemsHistory: [],
      Category: [],
      page: 'งาน',
      menu: 'งานเสร็จ',
      open: true,
      filterTaskType: 'SHOW_ACTIVATE',
      user: null,
      isWaitingForUserResult: true,
    }
  }

  componentWillMount() {
    var self = this
    auth.onAuthStateChanged((user) => {
      if (user) { self.onSetUser(user) }
      self.setState({ isWaitingForUserResult: false })
    })
  }

  componentDidMount() {
    // this.queryTask()
    // this.queryHistory()
  }

  // input
  addItem = (Task) => {
    var { items, user } = this.state
    var self = this

    var s = moment(Task.startAt.toDateString()).format('YYYY-MM-DD');
    var e = moment(Task.endAt.toDateString()).format('YYYY-MM-DD');
    var TaskDate = {
      name: Task.name,
      startAt: s,
      endAt: e,
      content: Task.content,
      isDone: Task.isDone,
      id: Task.id,
    }

    const updateTask = update(items, { $push: [TaskDate] })

    itemRef
      .add(Task)
      .then(function (docRef) {
        const TaskLength = updateTask.length
        const id = docRef.id
        updateTask[TaskLength - 1].id = id
        self.onArrayUpdate(updateTask)
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
    this.onArrayUpdate(editItem)
    itemRef.doc(id).set({
      name: item.name,
      startAt: new Date(item.startAt),
      endAt: new Date(item.endAt),
      content: item.content,
    }, { merge: true });
  };

  deleteItem = (itemTask) => {
    let { items } = this.state
    var index = items.findIndex(item => item.id === itemTask.id)
    //console.log(this.state.items,'before')
    //console.log(index,'index')
    const deleteTask = update(items, { $splice: [[index, 1]] })

    this.onArrayUpdate(deleteTask)

    itemRef.doc(itemTask.id).delete()

    //   else {
    //     let { itemsHistory } = this.state
    //     var index = this.state.itemsHistory.findIndex(item => item.id === itemTask.id)
    //     //console.log(this.state.items,'before')
    //     //console.log(index,'index')
    //     itemsHistory.splice(index, 1)
    //     this.setState({ itemsHistory })
    //     itemRef.doc(itemTask.id).delete()
    //   }
  };

  onArrayUpdate = (updateTasks) => {
    this.setState({ items: updateTasks }, () => {
      this.onFilterTask()
    })
  }

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
    // var uid = this.state.user.uid
    var uid = this.state.user.uid
    var self = this

    const queryRef = itemRef.where('user', '==', uid)
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
            name: doc.data().name,
            content: doc.data().content,
            startAt: sdstring,
            endAt: edstring,
            isDone: doc.data().isDone,
            id: doc.id,
          })
          //console.log(doc.id, " => ", doc.data());
        });
        self.setState({ items }, () => {
          self.onFilterTask(self.state.filterTaskType)
        })

      })
      .catch(function (error) {
        3
        console.log("Error getting documents: ", error);
      });
  };

  // queryHistory = () => {
  //   var items = []
  //   var self = this
  //   const queryRef = itemRef.where('isDone', '==', true)
  //   queryRef.get()
  //     .then(function (querySnapshot) {
  //       querySnapshot.forEach(function (doc) {
  //         var isd = new Date(doc.data().startAt.toDate());
  //         var ied = new Date(doc.data().endAt.toDate());
  //         var Bes = isd.toDateString();
  //         var Bee = ied.toDateString();
  //         var sdstring = moment(Bes).format('YYYY-MM-DD');
  //         var edstring = moment(Bee).format('YYYY-MM-DD');
  //         items.push({
  //           isDone: doc.data().isDone,
  //           content: doc.data().content,
  //           startAt: sdstring,
  //           endAt: edstring,
  //           name: doc.data().name,
  //           id: doc.id,
  //         })
  //         //console.log(doc.id, " => ", doc.data());
  //       });
  //       self.onSortItemsDone(items)
  //     })
  //     .catch(function (error) {
  //       3
  //       console.log("Error getting documents: ", error);
  //     });
  // };

  onSortItems = (items) => {
    var itemsSort = items.sort(function (x, y) {
      var a = new Date(x.startAt);
      var b = new Date(y.startAt);

      return a - b;
    });

    this.setState({
      showItems: itemsSort
    }, () => {
      console.log(this.state.showItems, 'showItems')
    })

  };

  // onSortItemsDone = (items) => {
  //   var itemsSort = items.sort(function (x, y) {
  //     var a = new Date(x.startAt);
  //     var b = new Date(y.startAt);

  //     return a - b;
  //   });

  //   this.setState({
  //     itemsHistory: itemsSort
  //   })
  //   console.log(itemsSort, 'items')
  // };

  taskDone = (value) => {
    let { items, itemsHistory, showItems } = this.state
    var index = items.findIndex(item => item.id === value.id)
    const isDone = items[index].isDone

    var updateTask = update(items, {
      [index]: {
        isDone: { $set: !isDone },
      }
    })
    console.log(updateTask, 'update')
    this.onArrayUpdate(updateTask)

    itemRef.doc(value.id).set({
      isDone: !value.isDone
    }, { merge: true })
  };

  // taskUnDone = (value) => {
  //   let { items, itemsHistory } = this.state
  //   var index = this.state.itemsHistory.findIndex(item => item.id === value.id)
  //   //console.log(this.state.items,'before')
  //   //console.log(index,'index')

  //   items.splice(index, 1)

  //   var TaskUnDone = {
  //     name: value.name,
  //     startAt: value.startAt,
  //     endAt: value.endAt,
  //     content: value.content,
  //     isDone: false,
  //     id: value.id
  //   }

  //   var updateTask = update(items, { $push: [TaskUnDone] })

  //   this.onSortItems(updateTask)
  //   this.setState({ itemsHistory })
  //   itemRef.doc(value.id).set({
  //     isDone: false
  //   }, { merge: true })
  // };

  onFilterTask = (filterTaskType = this.state.filterTaskType) => {
    const { items, page } = this.state

    if (filterTaskType !== this.state.filterTaskType) {
      this.setState({ filterTaskType })
    }

    switch (filterTaskType) {
      case 'SHOW_ALL':
        return (
          this.onSortItems(items)
        )

      case 'SHOW_HISTORY':
        const showComplete = items.filter((task) => task.isDone === true)
        return (this.onSortItems(showComplete))

      case 'SHOW_ACTIVATE':
        const showActivate = items.filter((task) => task.isDone === false)
        return (this.onSortItems(showActivate))

    }
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

  onSetUser = (user) => {
    this.setState({ user: user }, () => {
      this.queryTask()
    })
  }
  onSetUserNull = () => {
    this.setState({ user: null })
  }

  renderpage = () => {
    switch (this.state.page) {
      case 'งาน':
        return (
          <div>

            <ShowButton
              {...this.state}
              onFilterTask={this.onFilterTask}

            />

            <Input
              {...this.state}
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
              taskUnDone={this.taskUnDone}
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
              editItem={this.editItem}
              {...this.state}
            />

          </div>
        );
    }
  }

  render() {
    const { user } = this.state
    return (
      user ?
        <div align="center">
          <Navbar
            handleDrawerOpen={this.handleDrawerOpen}
            changeMenu={this.changeMenu}
            {...this.state}
          />

          <Category
            {...this.state}
            handleDrawerOpen={this.handleDrawerOpen}
            onSetUserNull={this.onSetUserNull}
          />

          <br /><br /><br /><br />

          {this.renderpage()}

          <br /><br /><br />

          <Navigation
            changePage={this.changePage}
            onFilterTask={this.onFilterTask}
          />
        </div>
        :
        <div>
          <Login
            onSetUser={this.onSetUser}

          />
        </div>

    )
  }
}

export default App;