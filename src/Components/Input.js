import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import purple from '@material-ui/core/colors/purple';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import update from 'immutability-helper';
var shortid = require('shortid');



const styles = theme => ({
    container: {
        // display: 'flex',
        // flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing.unit,
    },
    cssLabel: {
        '&$cssFocused': {
            color: purple[500],
        },
    },
    cssFocused: {},
    cssUnderline: {
        '&:after': {
            borderBottomColor: purple[500],
        },
    },
    button: {
        margin: theme.spacing.unit,
    },
});

class InputItem extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            task: '',
            startAt: new Date(),
            endAt: new Date(),
            content: '',
            isDone: false,
            id: null,
        }
        this.handleOnchange = this.handleOnchange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleOnchange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit() {
        if (!this.state.name.trim()) {
            alert('กรอก')
            this.setState({ name: '', })
        } else {
            var Task = {
                name: this.state.name,
                startAt:new Date(),
                endAt:new Date(),
                content:'',
                isDone: false,
                id: null
            }
            this.props.addItem(Task)
            this.setState({ name: '', })
        }

        // itemTask.push(task)
    }


    render() {
        const { classes } = this.props;

        return (
            <div className={classes.container}>
                <FormControl className={classes.margin}>
                    <InputLabel
                        FormLabelClasses={{
                            root: classes.cssLabel,
                            focused: classes.cssFocused,
                        }}
                        htmlFor="custom-css-input"
                    >
                        เพิ่มงาน
                    </InputLabel>
                    <Input
                        classes={{
                            underline: classes.cssUnderline,
                        }}
                        id="custom-css-input"
                        name="name"
                        onChange={this.handleOnchange}
                        value={this.state.name}
                    />
                </FormControl>
                <Button onClick={this.handleSubmit} variant="fab" color="primary" className={classes.button}>
                    <AddIcon />
                </Button>


            </div>
        );
    }
}
InputItem.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InputItem);