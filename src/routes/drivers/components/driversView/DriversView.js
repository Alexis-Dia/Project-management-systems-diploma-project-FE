import React, {Component} from 'react'
import {connect} from 'react-redux'
import './DriversView.scss'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import {GET_DRIVERS, LOGIN} from "../../../../api/login/loginActions";
import {ADD_FLASH_MESSAGE} from "../../../../api/flash/flashActions";
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: 20,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    margin: '10px',
  },
});

class DriversView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      drivers: [],
    }
  }

  componentWillMount() {
  }

  componentWillUnmount() {
  }

  shouldComponentUpdate() {
    return true;
  }

  componentWillUpdate() {
  }

  componentDidUpdate() {
  }

  componentDidMount() {
    this.props.getDrivers({
      data: {},
      credentials: {emailAddress: this.props.auth.user.emailAddress, password: this.props.auth.user.password}
    });
  }

  componentWillReceiveProps(nextprops) {
    if (nextprops.auth && nextprops.auth.list && nextprops.auth.list !== this.props.auth.list) {
      this.setState({drivers: nextprops.auth.list});
    }
  }

  render = () => {
    const {classes, auth} = this.props;

    return (
      <div style={{height: '650px', marginLeft: '200px', marginTop: '75px'}}>
        <MuiThemeProvider>
          {auth.isAuthenticated && auth.user.userRole === 'ADMIN' ?
              (
                  <Paper className={classes.root}>
                    <Table className={classes.table}>
                      <TableHead>
                        <TableRow>
                          <TableCell>Id</TableCell>
                          <TableCell numeric>Name</TableCell>
                          <TableCell numeric>Birthday</TableCell>
                          <TableCell numeric>Email</TableCell>
                          <TableCell numeric>Money</TableCell>
                          <TableCell numeric>Role</TableCell>
                          <TableCell numeric>Status</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {this.state.drivers && this.state.drivers.map(driver => {
                          return (
                              <TableRow key={driver.userID}>
                                <TableCell component="th" scope="row">
                                  {driver.userID}
                                </TableCell>
                                <TableCell numeric>{driver.lastName + ' ' + driver.firstName + ' ' + driver.patronomic}</TableCell>
                                <TableCell numeric>{driver.birthday}</TableCell>
                                <TableCell numeric>{driver.emailAddress}</TableCell>
                                <TableCell numeric>{driver.money}</TableCell>
                                <TableCell numeric>{driver.userRole}</TableCell>
                                <TableCell numeric>{driver.userStatus}</TableCell>
                              </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </Paper>
              )
                  :
              (
                  <div></div>
              )
          }

        </MuiThemeProvider>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.auth || {},
    drivers: state.auth.list || [],
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getDrivers: (data) => dispatch({type: GET_DRIVERS, data}),
    showFlashMessage: (data) => dispatch({type: ADD_FLASH_MESSAGE, data})
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(DriversView));
