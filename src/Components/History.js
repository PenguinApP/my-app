import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import TaskEdit from './TaskEdit';
import TaskDelete from './TaskDelete';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 2,
        [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
            width: 800,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    text: {
        textDecoration: 'line-through',
    },

});

class History extends Component {

    constructor(props) {
        super(props)
        this.state = {
            checked: [1],
            item: [],
            openEdit: false,
            openDelete: false,
            selectedTaskIndex: '',
        }
    }

    handleToggleDeleteTask = (close) => {
        this.setState({ openDelete: close })
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

        this.props.taskBack(value)
    };


    render() {
        const { itemsHistory, classes, deleteItem } = this.props;
        return (
            <div className={classes.root}>
                <main className={classes.layout}>
                    <List component="nav">
                        {itemsHistory.map((value, index) => {
                            return (

                                <ListItem
                                    key={value.id}
                                    button
                                >
                                    <ListItemText
                                        className={classes.text}
                                        primary={value.name}
                                    />

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

                    <TaskDelete
                        handleToggleDeleteTask={this.handleToggleDeleteTask}
                        deleteItem={deleteItem}
                        {...this.state}
                    />
                </main>
            </div>
        )
    }
}

History.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(History);

