import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import TaskEdit from './TaskEdit';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
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
        }
    }

    handleEditOpen = (value) => {
        this.setState({ item: value, openEdit: true })
    }
    handleToggleEditTask = () => {
        this.setState({ openEdit: !this.state.openEdit })
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
        const { items, classes } = this.props;
        return (
            <div className={classes.root}>

                <List component="nav">
                    {items.map((value) => {
                        return (
                            <ListItem
                                key={value.id}
                                button
                                onClick={() => this.handleEditOpen(value)}
                            >
                                <ListItemText

                                    primary={value.name} />
                                <ListItemSecondaryAction>
                                    <Checkbox
                                        onChange={this.handleToggle(value.id)}
                                        checked={this.state.checked.indexOf(value.id) !== -1}
                                    />
                                </ListItemSecondaryAction>
                            </ListItem>
                        )
                    }
                    )
                    }
                </List>

                <TaskEdit
                    handleToggleEditTask={this.handleToggleEditTask}
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
