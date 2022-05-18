import React, {Component} from 'react'
import {connect} from 'react-redux'
import './TasksView.scss'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import {ADD_FLASH_MESSAGE} from "../../../../api/flash/flashActions";
import {
  VALIDATE_TASK,
  GET_MINE_TASK,
  GET_TASKS, FINISH_TASK,
} from "../../../../api/task/taskActions";
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Link from "react-router/es/Link";
import Button from "@material-ui/core/Button";

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

class TasksView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      auth: null,
      tasks: [],
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
      this.props.getMineTasks({
        data: {id: this.props.auth.user.userID},
        credentials: {emailAddress: this.props.auth.user.emailAddress, password: this.props.auth.user.password}
      });
    } else if(this.props.auth.user.userRole === 'ADMIN') {
      this.props.getTasks({
        data: {},
        credentials: {emailAddress: this.props.auth.user.emailAddress, password: this.props.auth.user.password}
      });
    }
  }

  componentWillReceiveProps(nextprops) {
    if (nextprops.auth !== this.props.auth) {
      if (nextprops.auth.isAuthenticated) {
        if (nextprops.auth.user.userRole === 'USER') {
          this.props.getMineTasks({
            data: {id: nextprops.auth.user.userID},
            credentials: {emailAddress: nextprops.auth.user.emailAddress, password: nextprops.auth.user.password}
          });
        } else if(nextprops.auth.user.userRole === 'ADMIN') {
          this.props.getTasks({
            data: {id: nextprops.auth.user.userID},
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

  finishTaskByDriver = (id) => {
    this.props.validateTask({
      data: {
        taskId: id,
        statusId: 3
      },
      credentials: {emailAddress: this.props.auth.user.emailAddress, password: this.props.auth.user.password}
    });
  };

  rejectTaskByAdmin = (id) => {
    this.props.finishTask({
      data: {
        taskId: id,
        statusId: 4
      },
      credentials: {emailAddress: this.props.auth.user.emailAddress, password: this.props.auth.user.password}
    });
  };

  finishTaskByAdmin = (id) => {
    this.props.finishTask({
      data: {
        taskId: id,
        statusId: 5
      },
      credentials: {emailAddress: this.props.auth.user.emailAddress, password: this.props.auth.user.password}
    });
  };

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
    task: state.task.list || [],
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getTasks: (data) => dispatch({type: GET_TASKS, data}),
    getMineTasks: (data) => dispatch({type: GET_MINE_TASK, data}),
    showFlashMessage: (data) => dispatch({type: ADD_FLASH_MESSAGE, data}),
    validateTask: (data) => dispatch({type: VALIDATE_TASK, data}),
    finishTask: (data) => dispatch({type: FINISH_TASK, data}),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(TasksView));
