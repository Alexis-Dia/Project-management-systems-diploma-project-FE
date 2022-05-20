import React, {Component} from 'react'
import {connect} from 'react-redux'
import './CreateTaskView.scss'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import { withStyles } from '@material-ui/core/styles';
import {
  DATE_TIME_FORMAT_DEFAULT,
  DATE_TIME_MASK,
  UTC_FORMAT,
  VIEW_TASKS_PAGE_PATH
} from "../../../../properties/properties";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {CREATE_TASK, GET_TASKS, TASK_WAS_SUCCESSFULLY_CREATED} from "../../../../api/task/taskActions";
import {browserHistory} from "react-router";
import {GET_PROJECTS} from "../../../../api/project/projectActions";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {DateTimePicker} from "material-ui-pickers";
import moment from "moment";
import {ALICEBLUE, LIGHT_CADETBLUE, LIGHTER_CADETBLUE} from "../../../../properties/colors";

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

class CreateTaskView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: null,
      distance: null,
      weight: null,
      reward: null,
      project: [],
      departure: null,
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
    if(this.props.auth.user.userRole === 'ADMIN') {
      this.props.getProjects({
        data: {page: "0", size: "10"},
        credentials: {emailAddress: this.props.auth.user.emailAddress, password: this.props.auth.user.password}
      });
    }
  }

  componentWillReceiveProps(nextprops) {
    if (nextprops.flashMessages !== this.props.flashMessages) {
        nextprops.flashMessages.map((msg) => {if (msg.text === TASK_WAS_SUCCESSFULLY_CREATED) {
        browserHistory.push(VIEW_TASKS_PAGE_PATH)}});
    }
    if (nextprops.auth !== this.props.auth) {
      if (nextprops.auth.isAuthenticated) {
         if(nextprops.auth.user.userRole === 'ADMIN') {
          this.props.getProjects({
            data: {page: "0", size: "10"},
            credentials: {emailAddress: nextprops.auth.user.emailAddress, password: nextprops.auth.user.password}
          });
        }
      }
      this.setState({auth: nextprops.auth});
    }
    if (nextprops.project && nextprops.project !== this.props.project) {
      this.setState({projects: nextprops.project});
    }
  }

  onChangeProject  = (e) => {
    this.setState({ projectId: e.target.value});
  };

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

  saveTask = () => {
    this.props.createTask({
      projectId: this.state.projectId,
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
      <div style={{height: '650px'}}>
      <div style={{height: '500px', marginLeft: '225px', width: '700px', backgroundColor: LIGHTER_CADETBLUE}}>
        <MuiThemeProvider>
          {auth.isAuthenticated && auth.user.userRole === 'ADMIN' ?
              (
                  <div style={{width: '800px'}}>
                    <Grid container spacing={0}>

                      <Grid item xs={12}>
                        <div style={{textAlign: 'center', paddingTop: '10px'}}> <h4>Create new task</h4></div>
                      </Grid>

                      <Grid item xs={12} sm={3}>
                        <div className={classes.paper}>Select project</div>
                      </Grid>
                      <Grid item xs={12} sm={9}>
                        <div className={classes.paper} style={{borderColor: '#43434'}}>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            onChange={this.onChangeProject}
                            style={{width: "200px", display: "block", marginLeft: "20px"}}
                          >
                            {this.props.project.map(project => <MenuItem  key={project.id} value={project.id}>{project.name}</MenuItem>)}
                          </Select>
                        </div>
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
                              margin: '16px 50px 0px 50px',
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
                      {this.state.projectId && this.state.name && this.state.departure && this.state.comment &&
                      <Button variant="contained" color="primary" onClick={this.saveTask}>
                        Add task
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
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.auth || {},
    flashMessages: state.flashMessages || {},
    project: state.project.list || [],
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    createTask: (data) => dispatch({type: CREATE_TASK, data}),
    getProjects: (data) => dispatch({type: GET_PROJECTS, data}),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CreateTaskView));
