import React, {Component} from 'react'
import {connect} from 'react-redux'
import './ReportsView.scss'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import {
ROLE_DRIVER, ROLE_ADMIN
} from '../../../../properties/properties'
import {
  ADD_FLASH_MESSAGE,
} from "../../../../api/flash/flashActions";
import {GET_REPORTS, GET_REPORTS_BY_TASK_ID} from "../../../../api/report/reportActions";
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
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

class ReportsView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      reports: [],
      auth: null,
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

  componentDidMount() {
    this.props.getReports({
      data: {},
      credentials: {emailAddress: this.props.auth.user.emailAddress, password: this.props.auth.user.password}
    });
  }

  componentWillReceiveProps(nextprops) {
    if (nextprops.auth !== this.props.auth) {
      this.setState({auth: nextprops.auth});
      if (nextprops.auth.isAuthenticated) {
        this.props.getReports({
          data: {},
          credentials: {emailAddress: nextprops.auth.user.emailAddress, password: nextprops.auth.user.password}
        });
      }
    }
    if (nextprops.report && nextprops.report !== this.props.report) {
      this.setState({reports: nextprops.report});
    }
  }

  render = () => {
    const {classes, auth} = this.props;

    const {isAuthenticated} = this.props.auth;
    let userIsDriver = false;
    let userIsAdmin = false;
    if (isAuthenticated) {
      let userRole = this.props.auth.user.userRole;
      if (userRole === ROLE_DRIVER) {
        userIsDriver = true;
      } else if (userRole === ROLE_ADMIN) {
        userIsAdmin = true;
      }
    }

    return (
        <div style={{height: '650px', marginLeft: '200px', marginTop: '75px'}}>
          <MuiThemeProvider>
            {isAuthenticated ?
                (
                    (userIsDriver ?
                        (
                          <Paper className={classes.root}>
                            <TableContainer className={classes.container} style={{maxHeight: '640px'}}>
                              <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                  <TableRow>
                                    <TableCell>Id</TableCell>
                                    <TableCell numeric>Departure</TableCell>
                                    <TableCell numeric>Weight</TableCell>
                                    <TableCell numeric>Distance</TableCell>
                                    <TableCell numeric>Arrival</TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {this.state.reports && this.state.reports.map(report => {
                                    return (
                                        <TableRow key={report.id}>
                                          <TableCell component="th" scope="row">
                                            {report.id}
                                          </TableCell>
                                          <TableCell numeric>{report.departure}</TableCell>
                                          <TableCell numeric>{report.weight}</TableCell>
                                          <TableCell numeric>{report.distance}</TableCell>
                                          <TableCell numeric>{report.arrival}</TableCell>
                                        </TableRow>
                                    );
                                  })}
                                </TableBody>
                              </Table>
                            </TableContainer>
                          </Paper>
                        )
                            :
                        (
                           <Paper className={classes.root}>
                            <TableContainer className={classes.container} style={{maxHeight: '640px'}}>
                              <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                  <TableRow>
                                    <TableCell>Id</TableCell>
                                    <TableCell numeric>Departure</TableCell>
                                    <TableCell numeric>Weight</TableCell>
                                    <TableCell numeric>Distance</TableCell>
                                    <TableCell numeric>Arrival</TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {this.state.reports && this.state.reports.map(report => {
                                    return (
                                        <TableRow key={report.id}>
                                          <TableCell component="th" scope="row">
                                            {report.id}
                                          </TableCell>
                                          <TableCell numeric>{report.departure}</TableCell>
                                          <TableCell numeric>{report.weight}</TableCell>
                                          <TableCell numeric>{report.distance}</TableCell>
                                          <TableCell numeric>{report.arrival}</TableCell>
                                        </TableRow>
                                    );
                                  })}
                                </TableBody>
                              </Table>
                            </TableContainer>
                          </Paper>
                        )
                    )
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
    flashMessages: state.flashMessages || {},
    report: state.report.list || [],
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getReports: (data) => dispatch({type: GET_REPORTS, data}),
    getReportsByTaskId: (data) => dispatch({type: GET_REPORTS_BY_TASK_ID, data}),
    showFlashMessage: (data) => dispatch({type: ADD_FLASH_MESSAGE, data})
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ReportsView));
