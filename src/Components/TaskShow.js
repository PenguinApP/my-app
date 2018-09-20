import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import TaskEdit from './TaskEdit';
import TaskDelete from './TaskDelete';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
var shortid = require('shortid');

const styles = theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
});

class TaskShow extends Component {

    constructor(props) {
        super(props)
        this.state = {
            task: '',
            checked: [1],
            item: [],
            openEdit: false,
            openDelete: false,
            selectedTaskIndex: '',
        }
    }

    handleEditOpen = (value, index) => {
        this.setState({ item: value, openEdit: true, selectedTaskIndex: index })
    }

    handleToggleEditTask = () => {
        this.setState({ openEdit: !this.state.openEdit })
    }

    handleToggleDeleteTask = (close) => {
        this.setState({ openDelete: close})
    }

    handleDeleteOpen = (value, index) => {
        this.setState({ item: value, openDelete: true, selectedTaskIndex: index })
    }

    handleToggle = value => () => {
        const { checked } = this.state;
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        this.setState({
            checked: newChecked,
        });
        console.log(newChecked)
    };


    render() {
        const { items, classes, editItem, deleteItem } = this.props;
        return (
            <div className={classes.root}>

                <List component="nav">
                    {items.map((value, index) => {
                        return (
                            <ListItem
                                key={value.id}
                                button
                                onClick={() => this.handleEditOpen(value, index)}
                            >

                                <Checkbox
                                    onChange={this.handleToggle(value.id)}
                                    checked={this.state.checked.indexOf(value.id) !== -1}
                                />

                                <ListItemText
                                    primary={value.name} />

                                <ListItemSecondaryAction>
                                    <IconButton aria-label="Delete" onClick={() => this.handleDeleteOpen(value, index)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>

                            </ListItem>
                        )
                    }
                    )
                    }
                </List>

                <TaskEdit
                    handleToggleEditTask={this.handleToggleEditTask}
                    editItem={editItem}
                    {...this.state}
                />

                <TaskDelete
                    handleToggleDeleteTask={this.handleToggleDeleteTask}
                    deleteItem={deleteItem}
                    {...this.state}
                />
            </div>
        );
    }
}
TaskShow.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TaskShow);
