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
import {GET_MINE_PROJECT, GET_PROJECTS} from "../../../../api/project/projectActions";

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
      projects: [],
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
      console.log("77777777777777777777777777777777.3 = ")
      this.props.getMineTasks({
        data: {id: this.props.auth.user.userID},
        credentials: {emailAddress: this.props.auth.user.emailAddress, password: this.props.auth.user.password}
      });
      this.props.getMineProjects({
        data: {id: this.props.auth.user.userID},
        credentials: {emailAddress: this.props.auth.user.emailAddress, password: this.props.auth.user.password}
      });
    } else if(this.props.auth.user.userRole === 'ADMIN') {
      this.props.getTasks({
        data: {},
        credentials: {emailAddress: this.props.auth.user.emailAddress, password: this.props.auth.user.password}
      });
      this.props.getProjects({
        data: {page: "0", size: "10"},
        credentials: {emailAddress: this.props.auth.user.emailAddress, password: this.props.auth.user.password}
      });
    }
  }

  componentWillReceiveProps(nextprops) {
    console.log("77777777777777777777777777777777.4 = ")
    if (nextprops.auth !== this.props.auth) {
      console.log("77777777777777777777777777777777.5 = ")
      if (nextprops.auth.isAuthenticated) {
        console.log("77777777777777777777777777777777.6 = ")
        if (nextprops.auth.user.userRole === 'USER') {
          console.log("77777777777777777777777777777777.7 = ")
          this.props.getMineTasks({
            data: {id: nextprops.auth.user.userID},
            credentials: {emailAddress: nextprops.auth.user.emailAddress, password: nextprops.auth.user.password}
          });
          console.log("nextprops.auth.user.userID = ", nextprops.auth.user.userID)
          this.props.getMineProjects({
            data: {id: nextprops.auth.user.userID},
            credentials: {emailAddress: nextprops.auth.user.emailAddress, password: nextprops.auth.user.password}
          });
        } else if(nextprops.auth.user.userRole === 'ADMIN') {
          this.props.getTasks({
            data: {id: nextprops.auth.user.userID},
            credentials: {emailAddress: nextprops.auth.user.emailAddress, password: nextprops.auth.user.password}
          });
          this.props.getProjects({
            data: {page: "0", size: "10"},
            credentials: {emailAddress: nextprops.auth.user.emailAddress, password: nextprops.auth.user.password}
          });
        }
      }
      this.setState({auth: nextprops.auth});
    }
    if (nextprops.task && nextprops.task !== this.props.task) {
      this.setState({tasks: nextprops.task});
    }
    if (nextprops.project && nextprops.project !== this.props.project) {
      this.setState({projects: nextprops.project});
    }
  }

  finishTaskByDriver = (id) => {
    this.props.finishTask({
      data: {
        taskId: id,
        status: "FINISHED"
      },
      credentials: {emailAddress: this.props.auth.user.emailAddress, password: this.props.auth.user.password}
    });
  };

  onHoldTaskByDriver = (id) => {
    this.props.finishTask({
      data: {
        taskId: id,
        status: "ON_HOLD"
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
        <div style={{height: '650px', marginLeft: '225px', marginTop: '80px'}}>
        <MuiThemeProvider>
          {auth.isAuthenticated ?
              (
                  <Paper className={classes.root}>
                    <Table className={classes.table}>
                      <TableHead>
                        <TableRow>
                          <TableCell>Id</TableCell>
                          <TableCell>Project name</TableCell>
                          <TableCell>Task status</TableCell>
                          <TableCell>Task Name</TableCell>
                          <TableCell>Number of reports</TableCell>
                          <TableCell>Comment</TableCell>
                          <TableCell>Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>

                        {this.state.projects && this.state.projects.map(proj => {
                          return (proj && proj.tasks && proj.tasks.map(task => {

                              return (
                                <TableRow key={task.id}>
                                  <TableCell component="th" scope="row">
                                    {task.id}
                                  </TableCell>
                                  <TableCell>{proj.name}</TableCell>
                                  <TableCell>{task.status}</TableCell>
                                  <TableCell>{task.name}</TableCell>
                                  {task.status !== 'FREE' ? (<TableCell numeric>
                                    {task && task.reports && task.reports.length && task.reports.length > 0 ?
                                      <Link to={`/reports/${task.id}/${task.name}`}>
                                        {task.reports.length}
                                      </Link>
                                      :
                                      <Link></Link>
                                    }
                                  </TableCell>) : (<TableCell numeric></TableCell>)}
                                  <TableCell>{task.comment}</TableCell>
                                  <TableCell>{(auth.user.userRole === 'USER' && auth.user.userStatus === 'BUSY' && task.status === 'IN_PROGRESS' && task.reports.length > 0) ?
                                    (
                                      <div>
                                        <Button variant="contained" color="secondary" onClick={() => {this.finishTaskByDriver(task.id)}}>
                                          Finish task
                                        </Button>
                                        <Button variant="contained" color="secondary" onClick={() => {this.onHoldTaskByDriver(task.id)}} style={{marginLeft: "15px"}}>
                                          On hold task
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

                          }))
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
    project: state.project.list || [],
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getProjects: (data) => dispatch({type: GET_PROJECTS, data}),
    getMineProjects: (data) => dispatch({type: GET_MINE_PROJECT, data}),
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
