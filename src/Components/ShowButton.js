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

import { Radio } from 'antd';

var shortid = require('shortid');



const styles = theme => ({

});

class ShowButtton extends Component {

    constructor(props) {
        super(props)
        this.state = {
            type: 'SHOW_ALL',
        }

    }

    handleMenuChange = (e) => {
        this.setState({ size: e.target.value });
    }

    handleShowButton = (type) => {
        this.setState({ type: type })

        this.props.onFilterTask(type)
    };

    render() {
        const { classes, filterTaskType } = this.props;

        return (
            <div>
                <Radio.Group value={filterTaskType} onChange={this.handleMenuChange}>
                    <Radio.Button value={'SHOW_ALL'} onClick={() => this.handleShowButton('SHOW_ALL')}>แสดงงานทั้งหมด</Radio.Button>
                    <Radio.Button value={'SHOW_ACTIVATE'} onClick={() => this.handleShowButton('SHOW_ACTIVATE')}>แสดงงานที่กำลังดำเนินงาน</Radio.Button>
                </Radio.Group>
            </div>
        );
    }
}
ShowButtton.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ShowButtton);