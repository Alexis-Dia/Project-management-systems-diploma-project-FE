import React, {Component} from 'react'
import {connect} from 'react-redux'
import './CreateReportView.scss'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import { withStyles } from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";
import {GET_MINE_TASK} from "../../../../api/task/taskActions";
import Button from "@material-ui/core/Button";
import {DateTimePicker} from 'material-ui-pickers';
import {
  DATE_TIME_FORMAT_DEFAULT,
  DATE_TIME_MASK,
  UTC_FORMAT,
  VIEW_TASKS_PAGE_PATH
} from "../../../../properties/properties";
import moment from "moment";
import {SAVE_REPORT} from "../../../../api/report/reportActions";
import {REPORT_WAS_SUCCESSFULLY_ADDED} from "../../../../api/flash/flashActions";
import {browserHistory} from "react-router";

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

class CreateReportView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      auth: null,
      tasks: [],
      currentTask: null,

      distance: null,
      departure: null,
      arrival: null,
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
        data: {id: this.props.auth.user.id},
        credentials: {emailAddress: this.props.auth.user.emailAddress, password: this.props.auth.user.password}
      });
    }
    this.props.task && this.props.task.map(task => {if (task.taskStatus === 'IN_PROGRESS') {this.setState({currentTask: task.id})}});
    if (this.props.task && this.props.task !== this.props.task) {
      this.setState({tasks: this.props.task});
      this.props.task.map(task => {if (task.taskStatus === 'IN_PROGRESS') {this.setState({currentTask: task.id})}});
    }
  }

  componentWillReceiveProps(nextprops) {
    if (nextprops.task && nextprops.task !== this.props.task) {
      this.setState({tasks: nextprops.task});
      nextprops.task.map(task => {if (task.taskStatus === 'IN_PROGRESS') {this.setState({currentTask: task.id})}});
    }
    if (nextprops.auth !== this.props.auth) {
      if (nextprops.auth && !nextprops.auth.isAuthenticated) {
        this.setState({currentTask: null});
      }
    }
    if (nextprops.flashMessages !== this.props.flashMessages) {
      nextprops.flashMessages.map((msg) => {if (msg.text === REPORT_WAS_SUCCESSFULLY_ADDED) {
        browserHistory.push(VIEW_TASKS_PAGE_PATH)}});
    }
    if (nextprops.task && nextprops.task !== this.props.task) {
      if (nextprops && nextprops.task) {
        let currentTask = nextprops.task.find(e => e.status === 'In progress');
        this.setState({currentTask: currentTask});
        console.log("current = ", currentTask)
      }
      console.log("nextprops.task = ", nextprops.task)
      this.setState({tasks: nextprops.task});
    }
  }

  onChangeName  = (e) => {
    this.setState({name: e.target.value});
  };

  onChangeComment  = (e) => {
    this.setState({comment: e.target.value});
  };

  onChangeDeparture  = (e) => {
    let departure = new Date(e);
    let departureToUTC = moment(departure).format(UTC_FORMAT);
    this.setState({departure: departureToUTC});
  };

  saveReport = () => {
    this.props.saveReport({
      taskId: this.state.currentTask.id,
      data: {
        name: this.state.name,
        comment: this.state.comment,
        createDate: this.state.departure
      },
      credentials: {emailAddress: this.props.auth.user.emailAddress, password: this.props.auth.user.password}
    });
  };

  render = () => {
    const {classes, auth} = this.props;


    return (
      <div style={{height: '650px', marginLeft: '200px'}}>
        <MuiThemeProvider>
          {auth.isAuthenticated ?
              (
                  <div style={{width: '700px'}}>
                    <Grid container spacing={0}>
                      <Grid item xs={12}>
                        <div style={{textAlign: 'center'}}> <h4>Create daily report for current active task - {this.state.currentTask && this.state.currentTask.name}</h4></div>
                      </Grid>

                      <Grid item xs={12} sm={3}>
                        <div className={classes.paper}>Name</div>
                      </Grid>
                      <Grid item xs={12} sm={9}>
                        <div className={classes.paper} style={{borderColor: '#43434'}}>
                          <TextField
                            underlineStyle={{borderColor: '#1eb1da', color: '#1eb1da'}}
                            style={{width: '200px', marginTop: '-10px', marginLeft: '-300px'}}
                            onChange={this.onChangeName}
                            name='priority'
                          />
                        </div>
                      </Grid>

                      <Grid item xs={12} sm={3}>
                        <div className={classes.paper}>Comment</div>
                      </Grid>
                      <Grid item xs={12} sm={9}>
                        <div className={classes.paper} style={{borderColor: '#43434'}}>
                          <TextField
                            type="string"
                            underlineStyle={{borderColor: '#1eb1da', color: '#1eb1da'}}
                            style={{width: '200px', marginTop: '-10px', marginLeft: '-300px'}}
                            onChange={this.onChangeComment}
                            name='comment'
                          />
                        </div>
                      </Grid>

                      <Grid item xs={12} sm={3}>
                        <div className={classes.paper}>Create date</div>
                      </Grid>
                      <Grid item xs={12} sm={9}>
                        <React.Fragment className={classes.paper} style={{borderColor: '#43434'}}>
                          <DateTimePicker
                            name="departure"
                            showTabs={true}
                            autoSubmit={false}
                            ampm={false}
                            keyboard
                            format={DATE_TIME_FORMAT_DEFAULT}
                            mask={DATE_TIME_MASK}
                            value={this.state.departure}
                            style={{
                              width: '200px',
                              margin: '16px 8px 0px 8px',

                            }}
                            showTodayButton
                            okLabel="Ok"
                            cancelLabel="Cancel"
                            todayLabel="Today"
                            onChange={this.onChangeDeparture}
                          />
                        </React.Fragment>
                      </Grid>

                    </Grid>
                    <div style={{marginLeft: '175px', marginTop: '30px'}}>
                      {this.state.name && this.state.departure && this.state.comment &&
                      <Button variant="contained" color="primary" onClick={this.saveReport}>
                        Add
                      </Button>
                      }
                    </div>
                  </div>
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
    task: state.task.list || [],
    flashMessages: state.flashMessages,
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getMineTasks: (data) => dispatch({type: GET_MINE_TASK, data}),
    saveReport: (data) => dispatch({type: SAVE_REPORT, data}),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CreateReportView));
