import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import classNames from 'classnames';
import User from '../Picture/User-dummy-300x300.png';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import PlaylistAdd from '@material-ui/icons/PlaylistAdd';
import FormatListBulleted from '@material-ui/icons/FormatListBulleted';

const drawerWidth = '300px';

const styles = theme => ({
    drawerPaper: {
        position: 'absolute',
        width: drawerWidth,
    },
    avatar: {
        margin: 10,
    },

});

class Category extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
        this.handleDrawerClose = this.handleDrawerClose.bind(this);
    }

    handleDrawerClose = (open) => {
        this.props.handleDrawerOpen(open)
    };

    render() {
        const { classes, theme } = this.props;
        return (
            <Drawer
                variant="temporary"
                anchor='left'
                open={this.props.open}
                onClose={() => this.handleDrawerClose(false)}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >

                <div className={classes.drawerHeader}>
                    <ListItem>
                        <Avatar alt="Remy Sharp" src={User} className={classes.avatar} />
                        <ListItemText primary="Username" secondary="Email" />
                        <IconButton onClick={() => this.handleDrawerClose(false)}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </ListItem>
                </div>
                <Divider />
                <ListItem button>
                    <ListItemIcon>
                        <FormatListBulleted />
                    </ListItemIcon>
                    <ListItemText primary="ส่วนตัว" /></ListItem>

                <ListItem button>
                    <ListItemIcon>
                        <PlaylistAdd />
                    </ListItemIcon>
                    <ListItemText primary="เพิ่มหมวดหมู่" />
                </ListItem>
            </Drawer>
        )
    }
}

Category.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Category);