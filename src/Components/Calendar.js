import React, { Component } from 'react';
import firebase, { auth, db } from '../Config/Firebase';
import 'antd/dist/antd.css';
import './Calendar.css';
import { Calendar, Badge } from 'antd';
import moment from 'moment';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

class CalendarTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: moment(),
            selectedValue: moment(),
            open: false,
        }
        this.getListData = this.getListData.bind(this)
        this.dateCellRender = this.dateCellRender.bind(this)
        this.monthCellRender = this.monthCellRender.bind(this)
        this.onSelect = this.onSelect.bind(this)
        this.onPanelChange = this.onPanelChange.bind(this)
    }

    getListData(value) {
        let listData = []
        //console.log(this.props.items)
        this.props.items.map((item) => {
            var time = moment(new Date(item.startAt)).format('MMMM Do YYYY')
            var time2 = moment(new Date(value)).format('MMMM Do YYYY')


            if (time === time2) {
                console.log(time, 'ตรงกัน', time2)
                listData.push(
                    { type: 'default', content: item.name },


                )
            }
        })


        return listData || [];
    }

    dateCellRender(value) {
        const listData = this.getListData(value);
        //console.log(listData)
        return (
            <ul className="events">
                {
                    listData.map(item => (
                        <li key={item.content}>
                            <Badge status={item.type} text={item.content} />
                        </li>
                    ))
                }
            </ul>
        );
    }

    getMonthData(value) {
        if (value.month() === 8) {
            return 1150;
        }
    }

    monthCellRender(value) {
        const num = this.getMonthData(value);
        return num ? (
            <div className="notes-month">
                <section>{num}</section>
                <span>Time</span>
            </div>
        ) : null;
    }

    onSelect = (value) => {
        this.setState({
            value,
            selectedValue: value,
            open: !this.state.open,
        });
        console.log(value._d)
    }

    onPanelChange = (value) => {
        console.log(value, 'phang')
        this.setState({ value });
    }

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {

        const { items } = this.props
        const { value, selectedValue } = this.state;
        return (
            <div>
                <Calendar
                    dateCellRender={this.dateCellRender}
                    monthCellRender={this.monthCellRender}
                    value={value}
                    onSelect={this.onSelect}
                    onPanelChange={this.onPanelChange}
                />

                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{}</DialogTitle>

                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {items.map((item) => {
                                return (
                                    <ListItem
                                        key={item.id}
                                    >
                                        {items.startAt === selectedValue._d ?
                                            <ListItemText
                                                primary={item.name} />
                                            :
                                            null
                                        }
                                    </ListItem>
                                )
                            }
                            )
                            }
                        </DialogContentText>
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Close
                        </Button>

                    </DialogActions>
                </Dialog>

            </div>
        )
    }
}
export default CalendarTask;