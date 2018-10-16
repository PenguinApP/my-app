import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import History from '@material-ui/icons/History';
import Assignment from '@material-ui/icons/Assignment';
import Event from '@material-ui/icons/Event';

const styles = {
    root: {
        position: 'fixed',
        width: '100%',
        bottom: 0,
    },
    selected: {
        color: '#00CCFF',
    },
};

class Navigation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: 0,
        }
        this.handleChange = this.handleChange.bind(this);
        this.changePage = this.changePage.bind(this);
    }

    handleChange = (event, value) => {
        this.setState({ value });
    };

    changePage(page, type) {
        this.props.changePage(page)
        this.props.onFilterTask(type)
        console.log(type)
    }

    render() {
        const { classes } = this.props;
        const { value } = this.state;

        return (
            <div>
                <BottomNavigation
                    value={value}
                    onChange={this.handleChange}
                    showLabels
                    className={classes.root}
                >
                    <BottomNavigationAction key='1' onClick={() => this.changePage('งาน', 'SHOW_ALL')} label="งาน" icon={<Assignment />} />
                    <BottomNavigationAction key='2' onClick={() => this.changePage('ประวัติ', 'SHOW_HISTORY')} label="ประวัติ" icon={<History />} />
                    <BottomNavigationAction key='3' onClick={() => this.changePage('ปฏิทิน')} label="ปฏิทิน" icon={<Event />} />
                </BottomNavigation>
            </div>
        );
    }
}

Navigation.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navigation);