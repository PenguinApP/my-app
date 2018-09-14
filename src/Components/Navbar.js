import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const styles = {
    root: {
        flexGrow: 1,
    },
    flex: {
        flexGrow: 1,
        textAlign: 'left',
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};


class Navbar extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
        this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
    }

    handleDrawerOpen = (open) => {
        this.props.handleDrawerOpen(open)
    };

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                            <IconButton onClick={() => this.handleDrawerOpen(true)} className={classes.menuButton} color="inherit" aria-label="Menu">
                                <MenuIcon />
                            </IconButton>
                        <Typography variant="title" color="inherit" className={classes.flex}>
                            {this.props.page}
                        </Typography>
                        <IconButton color="inherit">
                            <MoreVertIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}
Navbar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navbar);