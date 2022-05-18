import React, {Component} from 'react'
import {connect} from 'react-redux'
import './ProjectsView.scss'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import {ADD_FLASH_MESSAGE} from "../../../../api/flash/flashActions";
import {
  VALIDATE_PROJECT,
  GET_MINE_PROJECT,
  GET_PROJECTS, FINISH_PROJECT,
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

class ProjectsView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      auth: null,
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
      this.props.getProjects({
        data: {page: "0", size: "10"},
        credentials: {emailAddress: this.props.auth.user.emailAddress, password: this.props.auth.user.password}
      });
    } else if(this.props.auth.user.userRole === 'ADMIN') {
      this.props.getProjects({
        data: {page: "0", size: "10"},
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
      this.setState({auth: nextprops.auth});
    }
    if (nextprops.project && nextprops.project !== this.props.project) {
      this.setState({projects: nextprops.project});
    }
  }

  finishProjectByDriver = (id) => {
    this.props.validateProject({
      data: {
        projectId: id,
        statusId: 3
      },
      credentials: {emailAddress: this.props.auth.user.emailAddress, password: this.props.auth.user.password}
    });
  };

  rejectProjectByAdmin = (id) => {
    this.props.finishProject({
      data: {
        projectId: id,
        statusId: 4
      },
      credentials: {emailAddress: this.props.auth.user.emailAddress, password: this.props.auth.user.password}
    });
  };

  finishProjectByAdmin = (id) => {
    this.props.finishProject({
      data: {
        projectId: id,
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
                          <TableCell>Name</TableCell>
                          <TableCell>Comment</TableCell>
                          <TableCell>Creation date</TableCell>
                          <TableCell>Hours</TableCell>
                          <TableCell>Priority</TableCell>
                          <TableCell>Budget</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {this.state.projects && this.state.projects.map(project => {
                          return (
                              <TableRow key={project.id}>
                                <TableCell numeric component="th" scope="row">
                                  {project.id}
                                </TableCell>
                                <TableCell>{project.name}</TableCell>
                                <TableCell>{project.comment}</TableCell>
                                <TableCell>{project.createDate}</TableCell>
                                <TableCell>{project.hours}</TableCell>
                                <TableCell>{project.priority}</TableCell>
                                <TableCell>{project.budget}</TableCell>
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
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getProjects: (data) => dispatch({type: GET_PROJECTS, data}),
    getMineProjects: (data) => dispatch({type: GET_MINE_PROJECT, data}),
    showFlashMessage: (data) => dispatch({type: ADD_FLASH_MESSAGE, data}),
    validateProject: (data) => dispatch({type: VALIDATE_PROJECT, data}),
    finishProject: (data) => dispatch({type: FINISH_PROJECT, data}),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ProjectsView));
