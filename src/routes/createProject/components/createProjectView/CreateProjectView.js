import React, {Component} from 'react'
import {connect} from 'react-redux'
import './CreateProjectView.scss'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import { withStyles } from '@material-ui/core/styles';
import { VIEW_PROJECTS_PAGE_PATH } from "../../../../properties/properties";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {CREATE_PROJECT, PROJECT_WAS_SUCCESSFULLY_CREATED} from "../../../../api/project/projectActions";
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

class CreateProjectView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: null,
      distance: null,
      weight: null,
      reward: null,
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
  }

  componentWillReceiveProps(nextprops) {
    if (nextprops.flashMessages !== this.props.flashMessages) {
        nextprops.flashMessages.map((msg) => {if (msg.text === PROJECT_WAS_SUCCESSFULLY_CREATED) {
        browserHistory.push(VIEW_PROJECTS_PAGE_PATH)}});
    }
  }

  onChangeName  = (e) => {
    this.setState({name: e.target.value});
  };

  onChangeDistance  = (e) => {
    this.setState({distance: e.target.value});
  };

  onChangeWeight  = (e) => {
    this.setState({weight: e.target.value});
  };

  onChangeReward  = (e) => {
    this.setState({reward: e.target.value});
  };

  saveProject = () => {

    this.props.createProject({
      data: {
        name: this.state.name,
        summaryDistance: this.state.distance,
        weight: this.state.weight,
        reward: this.state.reward,
      },
      credentials: {emailAddress: this.props.auth.user.emailAddress, password: this.props.auth.user.password}
    });
  };

  render = () => {
    const {classes, auth} = this.props;

    return (
      <div style={{height: '650px', marginLeft: '200px'}}>
        <MuiThemeProvider>
          {auth.isAuthenticated && auth.user.userRole === 'ADMIN' ?
              (
                  <div style={{width: '800px'}}>
                    <Grid container spacing={0}>
                      <Grid item xs={12}>
                        <div style={{textAlign: 'center'}}> <h4>Create new project</h4></div>
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
                              name='weight'
                          />
                        </div>
                      </Grid>

                      <Grid item xs={12} sm={3}>
                        <div className={classes.paper}>Summary distance</div>
                      </Grid>
                      <Grid item xs={12} sm={9}>
                        <div className={classes.paper} style={{borderColor: '#43434'}}>
                          <TextField
                              type="number"
                              underlineStyle={{borderColor: '#1eb1da', color: '#1eb1da'}}
                              style={{width: '200px', marginTop: '-10px', marginLeft: '-300px'}}
                              onChange={this.onChangeDistance}
                              name='weight'
                          />
                        </div>
                      </Grid>

                      <Grid item xs={12} sm={3}>
                        <div className={classes.paper}>Weight</div>
                      </Grid>
                      <Grid item xs={12} sm={9}>
                        <div className={classes.paper} style={{borderColor: '#43434'}}>
                          <TextField
                              type="number"
                              underlineStyle={{borderColor: '#1eb1da', color: '#1eb1da'}}
                              style={{width: '200px', marginTop: '-10px', marginLeft: '-300px'}}
                              onChange={this.onChangeWeight}
                              name='weight'
                          />
                        </div>
                      </Grid>

                      <Grid item xs={12} sm={3}>
                        <div className={classes.paper}>Reward</div>
                      </Grid>
                      <Grid item xs={12} sm={9}>
                        <div className={classes.paper} style={{borderColor: '#43434'}}>
                          <TextField
                              type="number"
                              underlineStyle={{borderColor: '#1eb1da', color: '#1eb1da'}}
                              style={{width: '200px', marginTop: '-10px', marginLeft: '-300px'}}
                              onChange={this.onChangeReward}
                              name='weight'
                          />
                        </div>
                      </Grid>

                    </Grid>
                    <div style={{marginLeft: '175px', marginTop: '30px'}}>
                      {this.state.name && this.state.distance && this.state.weight && this.state.reward &&
                      <Button variant="contained" color="primary" onClick={this.saveProject}>
                        Add project
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
    flashMessages: state.flashMessages || {},
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    createProject: (data) => dispatch({type: CREATE_PROJECT, data}),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CreateProjectView));
