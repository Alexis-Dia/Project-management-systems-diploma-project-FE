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
        data: {},
        credentials: {emailAddress: this.props.auth.user.emailAddress, password: this.props.auth.user.password}
      });
      this.props.getAllFreeCars({
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
            data: {},
            credentials: {emailAddress: nextprops.auth.user.emailAddress, password: nextprops.auth.user.password}
          });
          this.props.getAllFreeCars({
            data: {},
            credentials: {emailAddress: nextprops.auth.user.emailAddress, password: nextprops.auth.user.password}
          });
        }
      }
      this.setState({auth: nextprops.auth});
    }
    if (nextprops.task && nextprops.task !== this.props.task) {
      this.setState({tasks: nextprops.task});
    }
    if (nextprops.flashMessages !== this.props.flashMessages) {
      nextprops.flashMessages.map((msg) => {if (msg.text === TASK_WAS_SUCCESSFULLY_ASSIGNED) {
        browserHistory.push(VIEW_TASKS_PAGE_PATH)}});
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
                          <TableCell>Summary distance</TableCell>
                          <TableCell>Weight</TableCell>
                          <TableCell>Driver</TableCell>
                          <TableCell>Car</TableCell>
                          <TableCell>Task status</TableCell>
                          <TableCell>Name</TableCell>
                          <TableCell>Number of reports</TableCell>
                          <TableCell>Reward</TableCell>
                          <TableCell></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {this.state.tasks && this.state.tasks.map(task => {
                          return (
                              <TableRow key={task.id}>
                                <TableCell component="th" scope="row">
                                  {task.id}
                                </TableCell>
                                <TableCell>{task.summaryDistance}</TableCell>
                                <TableCell>{task.weight}</TableCell>
                                {task.taskStatus !== 'FREE' ? (<TableCell>{task.driver.lastName + ' ' + task.driver.firstName + ', ID is ' + task.driver.userID}</TableCell>) : (<TableCell></TableCell>)}
                                <TableCell>
                                  <Select
                                      labelId="demo-simple-select-label"
                                      id="demo-simple-select"
                                      onChange={(e) => {this.onChoseCar(e, task.id)}}
                                      style={{width: "200px"}}
                                  >
                                    {this.props.freeCar.map(car => <MenuItem  key={car.id} value={car.id}>{car.number}</MenuItem>)}
                                  </Select>
                                </TableCell>
                                <TableCell>{task.taskStatus}</TableCell>
                                <TableCell>{task.name}</TableCell>
                                {task.taskStatus !== 'FREE' ? (<TableCell>{task.reports.length}</TableCell>) : (<TableCell></TableCell>)}
                                <TableCell>{task.reward}</TableCell>
                                <TableCell>{(this.state.chosenTaskId === task.id) && (
                                    <div>
                                      <Button variant="contained" color="primary" onClick={this.takeTask}>
                                        Take task
                                      </Button>
                                    </div>)
                                }</TableCell>
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
