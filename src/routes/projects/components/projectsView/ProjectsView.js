import React, {Component} from 'react'
import {connect} from 'react-redux'
import './ProjectsView.scss'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import {ADD_FLASH_MESSAGE} from "../../../../api/flash/flashActions";
import {
  VALIDATE_PROJECT,
  GET_MINE_PROJECT,
  GET_PROJECTS, ADD_USER_TO_THE_PROJECT, REMOVE_USER_FROM_THE_PROJECT,
} from "../../../../api/project/projectActions";
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Link from "react-router/es/Link";
import Button from "@material-ui/core/Button";
import setAuthorizationToken from "../../../../utils/setAuthorizationToken";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {GET_DRIVERS} from "../../../../api/login/loginActions";
import {makeStyles} from "@material-ui/core";
import IconButton from "material-ui/IconButton";
import NavigationMenu from "material-ui/svg-icons/navigation/menu";
import Trash from "react-icons/lib/fa/trash";
import {VIEW_TASKS, VIEW_TASKS_PAGE_PATH} from "../../../../properties/properties";
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

function getShortDrivers(users) {
  let map = users.map(user => {
    return user.firstName + " " + user.lastName
  });
  return map;
}

class ProjectsView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      auth: null,
      projects: [],
      projectId: null,
      userId: null,
      defaultSelect: "1",
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
      this.props.getMineProjects({
        data: {id: this.props.auth.user.userID},
        credentials: {emailAddress: this.props.auth.user.emailAddress, password: this.props.auth.user.password}
      });
    } else if(this.props.auth.user.userRole === 'ADMIN') {
      this.props.getProjects({
        data: {page: "0", size: "10"},
        credentials: {emailAddress: this.props.auth.user.emailAddress, password: this.props.auth.user.password}
      });
      this.props.getDrivers({
        data: {},
        credentials: {emailAddress: this.props.auth.user.emailAddress, password: this.props.auth.user.password}
      });
    }
  }

  componentWillReceiveProps(nextprops) {
    if (nextprops.auth !== this.props.auth) {
      if (nextprops.auth.isAuthenticated) {
        if (nextprops.auth.user.userRole === 'USER') {
          this.props.getMineProjects({
            data: {id: nextprops.auth.user.userID},
            credentials: {emailAddress: nextprops.auth.user.emailAddress, password: nextprops.auth.user.password}
          });
        } else if(nextprops.auth.user.userRole === 'ADMIN') {
          this.props.getProjects({
            data: {page: "0", size: "10"},
            credentials: {emailAddress: nextprops.auth.user.emailAddress, password: nextprops.auth.user.password}
          });
        }
      }
      if (nextprops && nextprops.auth && nextprops.auth.list) {
        let drivers = getShortDrivers(nextprops.auth.list)
        this.setState({drivers: drivers});
        this.setState({fullDrivers: nextprops.auth.list});
        //this.setState({drivers: nextprops.auth.list});
      }
      this.setState({auth: nextprops.auth});
    }
    if (nextprops.project && nextprops.project !== this.props.project) {
      this.setState({projects: nextprops.project});
    }
  }

  addUser = () => {
    this.props.addUserTheProject({
      data: {
        projectId: this.state.projectId,
        userId: this.state.userId,
      },
      credentials: {emailAddress: this.props.auth.user.emailAddress, password: this.props.auth.user.password}
    });
    this.setState({ "projectId": null, "userId": null, "userName": null, "defaultSelect": "" });
  };

  onAddNewUser  = (value, user, target) => {
    if (user === 100) {
      this.setState({ "projectId": null, "userId": null, "userName": null, "defaultSelect": "" });
    } else {
      this.setState({ "projectId": value.id  });
      this.setState({ "userId": user  });
      this.setState({ "userName": target.props.children  });
      this.setState({ "defaultSelect": target.props.children  });
    }
  };

  onDeleteUser = (project, user) => {
    this.props.removeUserFromTheProject({
      data: {
        projectId: project.id,
        userId: user.id,
      },
      credentials: {emailAddress: this.props.auth.user.emailAddress, password: this.props.auth.user.password}
    });
    this.setState({ "projectId": null, "userId": null, "userName": null, "defaultSelect": "" });
  };

  render = () => {
    const {classes, auth} = this.props;

    return (
        <div style={{height: '650px', marginLeft: '225px', marginTop: '85px'}}>
        <MuiThemeProvider>
          {auth.isAuthenticated ?
              (
                  <Paper className={classes.root}>
                    <Table className={classes.table}>
                      <TableHead>
                        <TableRow>
                          <TableCell>Id</TableCell>
                          <TableCell>Name</TableCell>
                          <TableCell>Comment</TableCell>
                          <TableCell>Creation date</TableCell>
                          <TableCell>Hours</TableCell>
                          <TableCell>Priority</TableCell>
                          <TableCell>Budget</TableCell>
                          <TableCell>Users</TableCell>
                          {this.props && this.props.auth && this.props.auth.user && this.props.auth.user.userRole === 'ADMIN' &&
                          <TableCell>Add</TableCell>
                          }
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {this.state.projects && this.state.projects.map(project => {
                          return (
                              <TableRow key={project.id}>
                                <TableCell component="th" scope="row">
                                  {project.id}
                                </TableCell>
                                <TableCell>{project.name}</TableCell>
                                <TableCell>{project.comment}</TableCell>
                                <TableCell>{project.createDate}</TableCell>
                                <TableCell>{project.hours}</TableCell>
                                <TableCell>{project.priority}</TableCell>
                                <TableCell>{project.budget}</TableCell>
                                <TableCell>{project.users && project.users.map(user => {
                                  return (
                                    <div style={{display: "flex", justifyContent: "space-between"}}>

                                      {this.props.auth && this.props.auth.user && this.props.auth.user.userID &&
                                      this.props.auth.user.userID == user.id ?
                                        <div style={{backgroundColor: "#ffa85d"}}>{user.firstName + " " + user.lastName}</div>
                                        :
                                        <div>{user.firstName + " " + user.lastName}</div>
                                      }
                                      {this.props && this.props.auth && this.props.auth.user && this.props.auth.user.userRole === 'ADMIN' &&
                                      <div onClick={(e, v) => {
                                        this.onDeleteUser(project, user)
                                      }} style={{marginLeft: "15px"}}><Trash color='red'/>
                                      </div>}
                                    </div>
                                  )
                                })}
                                </TableCell>
                                {this.props && this.props.auth && this.props.auth.user && this.props.auth.user.userRole === 'ADMIN' &&
                                <TableCell style={{width: "370px"}}>
                                  {project.users && project.users.length > 0}
                                  <div style={{display: "flex"}}>
                                    <Select
                                      //value={this.state.defaultSelect}
                                      labelId="demo-simple-select-label"
                                      id="demo-simple-select"
                                      onChange={(e, v) => {
                                        this.onAddNewUser(project, e.target.value, v)
                                      }}
                                      style={{width: "180px", display: "block", marginLeft: "5px", marginRight: "20px"}}
                                    >
                                      <MenuItem key={100} value={100}>
                                        <div></div>
                                      </MenuItem>
                                      {project.users && this.state.drivers && this.state.fullDrivers && this.state.fullDrivers
                                        .filter(user => !getShortDrivers(project.users).includes(user.firstName + " " + user.lastName))
                                        .map(user =>
                                          <MenuItem key={user.id} value={user.id}>
                                            {user.firstName + " " + user.lastName}
                                          </MenuItem>
                                        )}
                                    </Select>
                                    {this.state.projectId && this.state.projectId === project.id &&
                                    <Button variant="contained" color="secondary" onClick={this.addUser}
                                            disabled={this.state.projectId ? false : true}>
                                      Add user
                                    </Button>
                                    }
                                  </div>
                                </TableCell>
                                }
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
    project: state.project.list || [],
    drivers: state.auth.list || [],
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getProjects: (data) => dispatch({type: GET_PROJECTS, data}),
    getMineProjects: (data) => dispatch({type: GET_MINE_PROJECT, data}),
    getDrivers: (data) => dispatch({type: GET_DRIVERS, data}),
    showFlashMessage: (data) => dispatch({type: ADD_FLASH_MESSAGE, data}),
    addUserTheProject: (data) => dispatch({type: ADD_USER_TO_THE_PROJECT, data}),
    removeUserFromTheProject: (data) => dispatch({type: REMOVE_USER_FROM_THE_PROJECT, data}),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ProjectsView));
