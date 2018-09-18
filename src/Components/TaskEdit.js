import React, { Component } from 'react';
import firebase, { db } from '../Config/Firebase';

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
            name: this.props.items.name,
            startAt: this.props.items.startAt,
            endAt: this.props.items.endAt,
            content: this.props.items.content,

        }
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSave(id) {
        var itemRef = db.collection('item').doc(id);

        var sd = new Date(this.props.startDate);

        console.log(sd);

        var ed = new Date(this.props.endDate);
        console.log(ed);

        var item = {
            name: this.props.name,
            content: this.props.content,
            startDate: sd,
            endDate: ed,
        }
        // this.props.onArrayUpdate(id, item)
        itemRef.update(item);
        //    var TT =  itemRef.doc(this.props.id).get()
        //         .then(function (hi) {

        //             var isd = new Date(hi.data().startDate.toDate());
        //             var ied = new Date(hi.data().endDate.toDate());
        //             var Bes = isd.toDateString();
        //             var Bee = ied.toDateString();
        //             var sdstring = moment(Bes).format('YYYY-MM-DD');
        //             var edstring = moment(Bee).format('YYYY-MM-DD');

        //          var  itemEdit = {
        //                 description: hi.data().description,
        //                 startDate: sdstring,
        //                 endDate: edstring,
        //                 taskName: hi.data().taskName,
        //                 id: hi.id,
        //             }
        //             TT.update(itemEdit)

        //             //console.log(doc.id, " => ", doc.data());
        //             console.log(itemRef, 'item Update ได้')
        //         })

        // .catch(function (error) {
        //     console.log("Error จ้า: ", error);
        // });

        this.setState({
        });
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
                            <Button color="inherit" onClick={() => this.handleSave(this.props.items.id)}>
                                save
                            </Button>
                        </Toolbar>
                    </AppBar>

                    <div>
                        <Form>
                            <FormGroup>
                                <Label for="taskName">ชื่องาน</Label>
                                <Input type="text" name="taskName" onChange={this.handleChange} value={this.state.name} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="startDate">startDate</Label>
                                <Input type="date" name="startDate" onChange={this.handleChange} value={this.state.startAt} />
                            </FormGroup>
                            {' '}
                            <FormGroup>
                                <Label for="endDate">endDate</Label>
                                <Input type="date" name="endDate" onChange={this.handleChange} value={this.state.endAt} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="description">คำอธิบาย</Label>
                                <Input type="text" name="description" onChange={this.handleChange} value={this.state.content} />
                            </FormGroup>
                        </Form>


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