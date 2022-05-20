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
      <div style={{height: '650px', marginLeft: '225px', marginTop: '75px'}}>
        <MuiThemeProvider>
          {auth.isAuthenticated && auth.user.userRole === 'ADMIN' ?
              (
                  <Paper className={classes.root}>
                    <Table className={classes.table}>
                      <TableHead>
                        <TableRow>
                          <TableCell>Id</TableCell>
                          <TableCell numeric>Name</TableCell>
                          <TableCell numeric>Finished Tasks</TableCell>
                          <TableCell numeric>All number of repots</TableCell>
                          <TableCell numeric>Working hours</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
{/*                        {this.state.drivers && this.state.drivers.map(driver => {
                          return (
                              <TableRow key={driver.userID}>
                                <TableCell component="th" scope="row">
                                  {driver.userID}
                                </TableCell>
                                <TableCell>{driver.lastName + ' ' + driver.firstName}</TableCell>
                                <TableCell>{driver.emailAddress}</TableCell>
                                <TableCell>{driver.money}</TableCell>
                                <TableCell>{driver.userRole}</TableCell>
                                <TableCell>{driver.userStatus}</TableCell>
                              </TableRow>
                          );
                        })}*/}
                        <TableRow key={1}>
                          <TableCell component="th" scope="row">{1}</TableCell>
                          <TableCell>Ivan Ivanov</TableCell>
                          <TableCell>15</TableCell>
                          <TableCell>54</TableCell>
                          <TableCell>178</TableCell>
                        </TableRow>
                        <TableRow key={2}>
                          <TableCell component="th" scope="row">{2}</TableCell>
                          <TableCell>Sergey Sergeyev</TableCell>
                          <TableCell>11</TableCell>
                          <TableCell>18</TableCell>
                          <TableCell>125</TableCell>
                        </TableRow>
                      </TableBody>
                      <TableRow key={3}>
                        <TableCell component="th" scope="row">{3}</TableCell>
                        <TableCell>Petr Petrov</TableCell>
                        <TableCell>9</TableCell>
                        <TableCell>11</TableCell>
                        <TableCell>96</TableCell>
                      </TableRow>
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
