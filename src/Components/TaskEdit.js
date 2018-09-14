import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Label,
    Input,
} from 'reactstrap';
var shortid = require('shortid');

const styles = {
    appBar: {
        position: 'relative',
    },
    flex: {
        flex: 1,
    },
};

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class TaskEdit extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
        this.handleClose = this.handleClose.bind(this);
    }

    handleClose(close, value) {
        this.props.handleEditOpen(close, value)
        console.log(close, 'Edit')
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <Dialog
                    fullScreen
                    open={this.props.openEdit}
                    onClose={this.handleClose}
                    TransitionComponent={Transition}
                >
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <IconButton color="inherit" onClick={() => this.handleClose(false, this.props.items)} aria-label="Close">
                                <CloseIcon />
                            </IconButton>
                            <Typography variant="title" color="inherit" className={classes.flex}>
                                {this.props.items.task}
                            </Typography>
                            <Button color="inherit" onClick={this.handleClose}>
                                save
                            </Button>
                        </Toolbar>
                    </AppBar>

                    <div>
                        <Form>
                            <FormGroup>
                                <Label for="taskName">ชื่องาน</Label>
                                <Input type="text" name="taskName" onChange={this.handleChange} value={this.props.items.task} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="startDate">startDate</Label>
                                <Input type="date" name="startDate" onChange={this.handleChange} value={this.state.startDate} />
                            </FormGroup>
                            {' '}
                            <FormGroup>
                                <Label for="endDate">endDate</Label>
                                <Input type="date" name="endDate" onChange={this.handleChange} value={this.state.endDate} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="description">คำอธิบาย</Label>
                                <Input type="text" name="description" onChange={this.handleChange} value={this.state.description} />
                            </FormGroup>
                            <FormGroup>
                                <div>
                                    <progress value={this.state.uploadValue} max="100">
                                        {this.state.uploadValue} %
                            </progress>
                                    <br />
                                    <input type="file" onChange={this.handleUpload} />
                                    <br />

                                </div>
                            </FormGroup>
                        </Form>
        
                        <Button outline color="secondary" onClick={() => this.modalCancle(this.props.id)}>ยกเลิก</Button>{' '}
                        <Button color="primary" onClick={() => this.handleSave(this.props.id)}>บันทึก</Button>

                    </div>

                </Dialog>
            </div>
        )
    }
}

TaskEdit.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TaskEdit);