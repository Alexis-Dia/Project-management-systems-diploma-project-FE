import React, {Component} from 'react'
import {connect} from 'react-redux'
import moment from "moment";
import './CreateCarView.scss'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import { withStyles } from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";
import {DateTimePicker} from "material-ui-pickers";
import {
  VIEW_CARS_PAGE_PATH,
  DATE_TIME_FORMAT_DEFAULT,
  DATE_TIME_MASK,
  UTC_FORMAT
} from "../../../../properties/properties";
import {CAR_WAS_SUCCESSFULLY_CREATED, CREATE_CAR} from "../../../../api/car/carActions";
import {browserHistory} from "react-router";
import Button from "@material-ui/core/Button";
import {GET_BRANDS} from "../../../../api/brand/brandActions";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

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

class CreateCarView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      brandID: null,
      year: null,
      number:null,
      dateOfReceipt: null,
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
    this.props.getAllBrands({
      data: {},
      credentials: {emailAddress: this.props.auth.user.emailAddress, password: this.props.auth.user.password}
    });
  }

  componentWillReceiveProps(nextprops) {
    if (nextprops.flashMessages !== this.props.flashMessages) {
      nextprops.flashMessages.map((msg) => {if (msg.text === CAR_WAS_SUCCESSFULLY_CREATED) {
        browserHistory.push(VIEW_CARS_PAGE_PATH)}});
    }
  }

  onChangeBrand  = (e) => {
    this.setState({ brandId: e.target.value});
  };

  onChangeYear  = (e) => {
    let year = new Date(e);
    let yearToUTC = moment(year).format(UTC_FORMAT);
    this.setState({year: yearToUTC});
  };

  onChangeNumber = (e) => {
    this.setState({number: e.target.value});
  };

  onChangeDateOfReceipt  = (e) => {
    let departure = new Date(e);
    let departureToUTC = moment(departure).format(UTC_FORMAT);
    this.setState({dateOfReceipt: departureToUTC});
  };

  saveCar = () => {
    this.props.createCar({
      data: {
        brand: {id: this.state.brandId},
        year: this.state.year,
        number: this.state.number,
        dateOfReceipt: this.state.dateOfReceipt,
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
                  <div style={{width: '800px'}}>
                    <Grid container spacing={0}>
                      <Grid item xs={12}>
                        <div style={{textAlign: 'center', marginLeft: '-75px'}}><h4>Create new car</h4></div>
                      </Grid>

                      <Grid item xs={12} sm={3}>
                        <div className={classes.paper}>Brand</div>
                      </Grid>
                      <Grid item xs={12} sm={9}>
                        <React.Fragment style={{borderColor: '#43434'}}>
                          <div style={{marginLeft: '45px', marginTop: '20px'}} >
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                onChange={this.onChangeBrand}
                                style={{width: "200px"}}
                            >
                             {this.props.brand.map(brand => <MenuItem  key={brand.id} value={brand.id}>{brand.brand + ' ' +  brand.model}</MenuItem>)}
                            </Select>
                          </div>
                        </React.Fragment>
                      </Grid>

                      <Grid item xs={12} sm={3}>
                        <div className={classes.paper}>Year</div>
                      </Grid>
                      <Grid item xs={12} sm={9}>
                        <div style={{marginLeft: '40px'}}>
                          <React.Fragment className={classes.paper} style={{borderColor: '#43434'}}>
                            <DateTimePicker
                                name="year"
                                showTabs={true}
                                autoSubmit={false}
                                ampm={false}
                                keyboard
                                format={DATE_TIME_FORMAT_DEFAULT}
                                mask={DATE_TIME_MASK}
                                value={this.state.year}
                                style={{
                                  width: '200px',
                                  margin: '16px 8px 0px 8px',
                                }}
                                showTodayButton
                                okLabel="Ok"
                                cancelLabel="Cancel"
                                todayLabel="Today"
                                onChange={this.onChangeYear}
                            />
                          </React.Fragment>
                        </div>
                      </Grid>

                      <Grid item xs={12} sm={3}>
                        <div className={classes.paper}>Number</div>
                      </Grid>
                      <Grid item xs={12} sm={9}>
                        <div className={classes.paper} style={{borderColor: '#43434'}}>
                          <TextField
                              underlineStyle={{borderColor: '#1eb1da', color: '#1eb1da'}}
                              style={{width: '200px', marginTop: '-10px', marginLeft: '-300px'}}
                              onChange={this.onChangeNumber}
                              name='number'
                          />
                        </div>
                      </Grid>

                      <Grid item xs={12} sm={3}>
                        <div className={classes.paper}>Date Of Receipt</div>
                      </Grid>
                      <Grid item xs={12} sm={9}>
                        <div style={{marginLeft: '40px'}}>
                          <React.Fragment className={classes.paper} style={{borderColor: '#43434'}}>
                            <DateTimePicker
                                name="dateOfReceipt"
                                showTabs={true}
                                autoSubmit={false}
                                ampm={false}
                                keyboard
                                format={DATE_TIME_FORMAT_DEFAULT}
                                mask={DATE_TIME_MASK}
                                value={this.state.dateOfReceipt}
                                style={{
                                  width: '200px',
                                  margin: '16px 8px 0px 8px',
                                }}
                                showTodayButton
                                okLabel="Ok"
                                cancelLabel="Cancel"
                                todayLabel="Today"
                                onChange={this.onChangeDateOfReceipt}
                            />
                        </React.Fragment>
                        </div>
                      </Grid>
                      <div style={{marginLeft: '175px', marginTop: '30px'}}>
                        {this.state.brandId && this.state.year && this.state.number && this.state.dateOfReceipt &&
                        <Button variant="contained" color="primary" onClick={this.saveCar}>
                          Add car
                        </Button>
                        }
                      </div>
                    </Grid>
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
    brand: state.brand.list || [],
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    createCar: (data) => dispatch({type: CREATE_CAR, data}),
    getAllBrands: (data) => dispatch({type: GET_BRANDS, data})
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CreateCarView));
