import React, {Component} from 'react'
import {connect} from 'react-redux'
import MenuItem from "@material-ui/core/MenuItem";
import './FreeTasksView.scss'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import {ADD_FLASH_MESSAGE} from "../../../../api/flash/flashActions";
import {GET_FREE_TASK, GET_TASKS, TAKE_TASK, TASK_WAS_SUCCESSFULLY_ASSIGNED} from "../../../../api/task/taskActions";
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import {GET_ALL_FREE_CARS} from "../../../../api/car/carActions";
import {browserHistory} from "react-router";
import {VIEW_TASKS_PAGE_PATH} from "../../../../properties/properties";
import Link from "react-router/lib/Link";

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

class FreeTasksView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      auth: null,
      tasks: [],
      chosenCarId: null,
      chosenTaskId: null,
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
    if (this.props.auth.user.userRole === 'USER') {
      this.props.getFreeTasks({
        data: {id: this.props.auth.user.id},
        credentials: {emailAddress: this.props.auth.user.emailAddress, password: this.props.auth.user.password}
      });
    } else if(this.props.auth.user.userRole === 'ADMIN') {
      this.props.getFreeTasks({
        data: {},
        credentials: {emailAddress: this.props.auth.user.emailAddress, password: this.props.auth.user.password}
      });
    }
  }

  takeTask = () => {
    this.props.takeTask({
      data: {
        taskId: this.state.chosenTaskId,
        carId: this.state.chosenCarId,
      },
      credentials: {emailAddress: this.props.auth.user.emailAddress, password: this.props.auth.user.password}
    });
  };

  onChoseCar  = (e, id) => {
    this.setState({ chosenCarId: e.target.value, chosenTaskId: id});
  };

  componentWillReceiveProps(nextprops) {
    if (nextprops.auth !== this.props.auth) {
      if (nextprops.auth.isAuthenticated) {
        if (nextprops.auth.user.userRole === 'USER') {
          this.props.getFreeTasks({
            data: {id: nextprops.auth.user.id},
            credentials: {emailAddress: nextprops.auth.user.emailAddress, password: nextprops.auth.user.password}
          });
        } else if(nextprops.auth.user.userRole === 'ADMIN') {
          this.props.getFreeTasks({
            data: {id: nextprops.auth.user.id},
            credentials: {emailAddress: nextprops.auth.user.emailAddress, password: nextprops.auth.user.password}
          });
        }
      }
      this.setState({auth: nextprops.auth});
    }
    if (nextprops.task && nextprops.task !== this.props.task) {
      this.setState({tasks: nextprops.task});
    }
  }

  render = () => {
    const {classes, auth} = this.props;

    return (
        <div style={{height: '650px', marginLeft: '200px', marginTop: '75px'}}>
        <MuiThemeProvider>
          {auth.isAuthenticated ?
              (
                  <Paper className={classes.root}>
                    <Table className={classes.table}>
                      <TableHead>
                        <TableRow>
                          <TableCell>Id</TableCell>
                          <TableCell numeric>Task status</TableCell>
                          <TableCell numeric>Name</TableCell>
                          <TableCell numeric>Number of reports</TableCell>
                          <TableCell numeric>Comment</TableCell>
                          <TableCell numeric></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {this.state.tasks && this.state.tasks.map(task => {
                          return (
                            <TableRow key={task.id}>
                              <TableCell component="th" scope="row">
                                {task.id}
                              </TableCell>
                              <TableCell numeric>{task.status}</TableCell>
                              <TableCell numeric>{task.name}</TableCell>
                              {/* {task.taskStatus !== 'FREE' ? (<TableCell numeric onClick={() => this.goToReportsByTaskId(task.id)}>{task.reports.length}</TableCell>) : (<TableCell numeric></TableCell>)}*/}
                              {task.taskStatus !== 'FREE' ? (<TableCell numeric>
                                <Link to={`/reports/${task.id}`}>
                                  {task.reports.length}
                                </Link>
                              </TableCell>) : (<TableCell numeric></TableCell>)}
                              <TableCell>{task.comment}</TableCell>
                              <TableCell>{(auth.user.userRole === 'USER' && auth.user.userStatus === 'BUSY' && task.taskStatus === 'IN_PROGRESS' && task.reports.length > 0) ?
                                (
                                  <div>
                                    <Button variant="contained" color="primary" onClick={() => {this.finishTaskByDriver(task.id)}}>
                                      Finish task
                                    </Button>
                                  </div>
                                ) :
                                (
                                  (auth.user.userRole === 'ADMIN' && (
                                      (task.taskStatus === 'VALIDATING' &&
                                        (
                                          <div>
                                            <Button variant="contained" color="primary" onClick={() => {this.finishTaskByAdmin(task.id)}} style={{transform: "scale(0.8)"}}>
                                              Approve
                                            </Button>
                                            <Button variant="contained" color="secondary" onClick={() => {this.rejectTaskByAdmin(task.id)}} style={{transform: "scale(0.8)"}}>
                                              Reject
                                            </Button>
                                          </div>
                                        )
                                      )
                                    )
                                  )
                                )
                              }
                              </TableCell>
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
    flashMessages: state.flashMessages || {},
    task: state.task.freeTaskList || [],
    freeCar: state.car.listOfFreeCars || [],
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getAllFreeCars: (data) => dispatch({type: GET_ALL_FREE_CARS, data}),
    getTasks: (data) => dispatch({type: GET_TASKS, data}),
    getFreeTasks: (data) => dispatch({type: GET_FREE_TASK, data}),
    takeTask: (data) => dispatch({type: TAKE_TASK, data}),
    showFlashMessage: (data) => dispatch({type: ADD_FLASH_MESSAGE, data})
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(FreeTasksView));
