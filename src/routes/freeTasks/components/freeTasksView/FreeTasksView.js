import React, {Component} from 'react'
import {connect} from 'react-redux'
import MenuItem from "@material-ui/core/MenuItem";
import './FreeTasksView.scss'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import {ADD_FLASH_MESSAGE} from "../../../../api/flash/flashActions";
import {
  FINISH_TASK,
  GET_FREE_TASK,
  GET_TASKS,
  TAKE_TASK,
  TASK_WAS_SUCCESSFULLY_ASSIGNED
} from "../../../../api/task/taskActions";
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

class FreeTasksView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      auth: null,
      tasks: [],
      chosenCarId: null,
      chosenTaskId: null,
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
      this.props.getFreeTasks({
        data: {id: this.props.auth.user.userID},
        credentials: {emailAddress: this.props.auth.user.emailAddress, password: this.props.auth.user.password}
      });
      this.props.getMineProjects({
        data: {id: this.props.auth.user.userID},
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
            data: {id: nextprops.auth.user.userID},
            credentials: {emailAddress: nextprops.auth.user.emailAddress, password: nextprops.auth.user.password}
          });
          nextprops.getMineProjects({
            data: {id: nextprops.auth.user.userID},
            credentials: {emailAddress: nextprops.auth.user.emailAddress, password: nextprops.auth.user.password}
          });
        } else if(nextprops.auth.user.userRole === 'ADMIN') {
          this.props.getFreeTasks({
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
    console.log("nextprops.project = ", nextprops.project)
    if (nextprops.project && nextprops.project !== this.props.project) {
      this.setState({projects: nextprops.project});
    }
  }

  startTaskByDriver = (id) => {
    this.props.finishTask({
      data: {
        taskId: id,
        status: "IN_PROGRESS"
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
                    <Table className={classes.table} style={{backgroundColor: "#f8f9ffb3"}}>
                      <TableHead>
                        <TableRow>
                          <TableCell>Id</TableCell>
                          <TableCell>Project name</TableCell>
                          <TableCell numeric>Task status</TableCell>
                          <TableCell numeric>Task name</TableCell>
                          <TableCell numeric>Number of reports</TableCell>
                          <TableCell numeric>Comment</TableCell>
                          <TableCell numeric>Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>

                        {this.state.projects && this.state.projects.map(proj => {
                          //return (proj && proj.tasks && proj.tasks.filter(ob => {
                            //return ob.status == "NEW"
                          return (proj && proj.tasks && proj.tasks.map(task => {
                            if (task.status == "NEW" || task.status == "ON_HOLD") {
                            return (
                              <TableRow key={task.id}>
                                <TableCell component="th" scope="row">
                                  {task.id}
                                </TableCell>
                                <TableCell>{proj.name}</TableCell>
                                <TableCell>{task.status}</TableCell>
                                <TableCell>{task.name}</TableCell>
                                {task.taskStatus !== 'FREE' ? (
                                  <TableCell numeric>
                                    {task && task.reports && task.reports.length && task.reports.length > 0 ?
                                      <Link to={`/reports/${task.id}`}>
                                        {task.reports.length}
                                      </Link>
                                      :
                                      <Link></Link>
                                    }
                                  </TableCell>
                                ) : (<TableCell numeric></TableCell>)}
                                <TableCell>{task.comment}</TableCell>
                                <TableCell>{(auth.user.userRole === 'USER' && auth.user.userStatus === 'FREE' &&
                                  (
                                    task.status === 'ON_HOLD' || task.status === 'NEW'
                                  )) ?
                                  (
                                    <div>
                                      <Button variant="contained" color="secondary" onClick={() => {this.startTaskByDriver(task.id)}}>
                                        Take task
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
                            );}

                          }))

                          //}))

                        })
                          //.filter(task => task.status !== "NEW")
                          //(user => !getShortDrivers(project.users).includes(user.firstName + " " + user.lastName))
                        }

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
    project: state.project.list || [],
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getProjects: (data) => dispatch({type: GET_PROJECTS, data}),
    getMineProjects: (data) => dispatch({type: GET_MINE_PROJECT, data}),
    getTasks: (data) => dispatch({type: GET_TASKS, data}),
    getFreeTasks: (data) => dispatch({type: GET_FREE_TASK, data}),
    finishTask: (data) => dispatch({type: FINISH_TASK, data}),
    takeTask: (data) => dispatch({type: TAKE_TASK, data}),
    showFlashMessage: (data) => dispatch({type: ADD_FLASH_MESSAGE, data})
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(FreeTasksView));
