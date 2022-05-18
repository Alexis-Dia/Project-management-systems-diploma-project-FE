import React, {Component} from 'react'
import {connect} from 'react-redux'
import './InformationView.scss'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { withStyles } from '@material-ui/core/styles';

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

class InformationView extends Component {

  constructor(props) {
    super(props);
    this.state = {

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
  }

  render = () => {
    const {classes, auth} = this.props;

    return (
      <div style={{height: '650px', marginLeft: '200px', marginTop: '75px'}}>
        <MuiThemeProvider>
          {auth.isAuthenticated ?
              (
                  <Grid container spacing={0}>
                    <Grid item xs={12}>
                      <Paper className={classes.paper}>{auth.user.lastName + ' ' + auth.user.firstName}</Paper>
                    </Grid>

                    <Grid item xs={12} sm={3}>
                      <Paper className={classes.paper}>ID</Paper>
                    </Grid>
                    <Grid item xs={12} sm={9}>
                      <Paper className={classes.paper}>{auth.user.id}</Paper>
                    </Grid>

                    <Grid item xs={12} sm={3}>
                      <Paper className={classes.paper}>Birthday</Paper>
                    </Grid>
                    <Grid item xs={12} sm={9}>
                      <Paper className={classes.paper}>{auth.user.birthday}</Paper>
                    </Grid>

                    <Grid item xs={12} sm={3}>
                      <Paper className={classes.paper}>Email</Paper>
                    </Grid>
                    <Grid item xs={12} sm={9}>
                      <Paper className={classes.paper}>{auth.user.emailAddress}</Paper>
                    </Grid>

                    <Grid item xs={12} sm={3}>
                      <Paper className={classes.paper}>Money</Paper>
                    </Grid>
                    <Grid item xs={12} sm={9}>
                      <Paper className={classes.paper}>{auth.user.money}</Paper>
                    </Grid>

                    <Grid item xs={12} sm={3}>
                      <Paper className={classes.paper}>Role</Paper>
                    </Grid>
                    <Grid item xs={12} sm={9}>
                      <Paper className={classes.paper}>{auth.user.userRole}</Paper>
                    </Grid>

                    {auth.user.userRole === 'USER' && (
                        <React.Fragment>
                          <Grid item xs={12} sm={3}>
                            <Paper className={classes.paper}>Status</Paper>
                          </Grid>
                          <Grid item xs={12} sm={9}>
                            <Paper className={classes.paper}>{auth.user.userStatus}</Paper>
                          </Grid>
                        </React.Fragment>
                      )
                    }
                  </Grid>
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
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(InformationView));
