import React, {Component} from 'react'
import {connect} from 'react-redux'
import {GET_CARS} from "../../../../api/car/carActions";
import './CarsView.scss'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import {ADD_FLASH_MESSAGE} from "../../../../api/flash/flashActions";
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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

class CarsView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cars: [],
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
    this.props.getAllCars({
      data: {},
      credentials: {emailAddress: this.props.auth.user.emailAddress, password: this.props.auth.user.password}
    });
  }

  componentWillReceiveProps(nextprops) {
    if (nextprops.car && nextprops.car !== this.props.car) {
      this.setState({cars: nextprops.car});
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
                          <TableCell numeric>Brand</TableCell>
                          <TableCell numeric>Capacity</TableCell>
                          <TableCell numeric>Year</TableCell>
                          <TableCell numeric>Number</TableCell>
                          <TableCell numeric>Data of receipt</TableCell>
                          <TableCell numeric>Status</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {this.state.cars && this.state.cars.map(car => {
                          return (
                              <TableRow key={car.id}>
                                <TableCell component="th" scope="row">
                                  {car.id}
                                </TableCell>
                                <TableCell numeric>{car.brand.brand + ' ' + car.brand.model}</TableCell>
                                <TableCell numeric>{car.brand.carryingCapacity}</TableCell>
                                <TableCell numeric>{car.year}</TableCell>
                                <TableCell numeric>{car.number}</TableCell>
                                <TableCell numeric>{car.dateOfReceipt}</TableCell>
                                <TableCell numeric>{car.carStatus}</TableCell>
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
    car: state.car.list || [],
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getAllCars: (data) => dispatch({type: GET_CARS, data}),
    showFlashMessage: (data) => dispatch({type: ADD_FLASH_MESSAGE, data})
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CarsView));
