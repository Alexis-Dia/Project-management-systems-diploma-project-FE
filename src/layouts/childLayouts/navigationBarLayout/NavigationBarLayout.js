import React, {Component} from 'react'
import {connect} from 'react-redux';
import {browserHistory} from 'react-router'

import SignUpForm from './signUp/SignUpForm'
import LogInForm from './logIn/LoginForm'
import {Modal, ModalBody} from 'reactstrap';
import {
    EN,
    RU,
    I18,
    LANGUAGE_DEFAULT,
    VIEW_TASKS_PAGE_PATH,
    VIEW_TASKS,
    ROLE_DRIVER,
    ROLE_ADMIN,
    CREATE_TASK,
    CREATE_TASK_PAGE_PATH,
    VIEW_ALL_DRIVERS_PAGE_PATH,
    VIEW_ALL_DRIVERS,
    VIEW_FREE_TASKS_PAGE_PATH,
    VIEW_FREE_TASKS,
    VIEW_PROJECTS_PAGE_PATH,
    VIEW_FREE_PROJECTS_PAGE_PATH,
    VIEW_PROJECTS,
    VIEW_FREE_PROJECTS,
    CREATE_PROJECT_PAGE_PATH,
    VIEW_MY_PROJECTS_PAGE_PATH, VIEW_MY_PROJECTS, KPI_PAGE_PATH, KPI, CREATE_NEW_USER
} from '../../../properties/properties'
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import Language from 'material-ui/svg-icons/action/language';
import ActionPowerSettingsNew from 'material-ui/svg-icons/action/power-settings-new';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import Badge from 'material-ui/Badge';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import {Toolbar, ToolbarGroup, ToolbarSeparator} from 'material-ui/Toolbar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './NavigationBarLayout.scss'
import {
    REGISTARATION_PAGE_PATH,
    EMPTY_PAGE_PATH,
    REPORTS_PAGE_PATH,
    ADD_REPORT_PAGE_PATH,
    INFORMATION,
    REPORTS,
    ADD_REPORT,
} from '../../../properties/properties';
import {DELETE_ALL_FLASH_MESSAGES} from '../../../api/flash/flashActions';
import {DELETE_CURRENT_USER} from '../../../api/login/loginActions'
import {DELETE_TASK} from "../../../api/task/taskActions";

class NavigationBarLayout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalSignUp: false,
            modalLogIn: false,
            modalDrawer: false,
            language: LANGUAGE_DEFAULT,
            currentPage: INFORMATION,
        };
    }

    toggleSignUp = () => {
        window.location = REGISTARATION_PAGE_PATH
    };

    toggleLogIn = () => {
        this.setState({
            modalLogIn: !this.state.modalLogIn
        });
    };

    toggleDrawer = () => {
        this.setState({
            modalDrawer: !this.state.modalDrawer
        });
    };

    onClickMyInformation = () => {
        const path = EMPTY_PAGE_PATH;
        browserHistory.push(path);
        this.toggleDrawer();
        this.setState({
            currentPage: INFORMATION,
        });
    };

    onClickViewAllDrivers = () => {
        const path = VIEW_ALL_DRIVERS_PAGE_PATH;
        browserHistory.push(path);
        this.toggleDrawer();
        this.setState({
            currentPage: VIEW_ALL_DRIVERS,
        });
    };

    onClickAllProjects = () => {
        const path = VIEW_PROJECTS_PAGE_PATH;
        browserHistory.push(path);
        this.toggleDrawer();
        this.setState({
            currentPage: VIEW_PROJECTS,
        });
    };

    onClickMylProjects = () => {
        const path = VIEW_PROJECTS_PAGE_PATH;
        browserHistory.push(path);
        this.toggleDrawer();
        this.setState({
            currentPage: VIEW_MY_PROJECTS,
        });
    };

    onClickFreeProjects = () => {
        const path = VIEW_FREE_PROJECTS_PAGE_PATH;
        browserHistory.push(path);
        this.toggleDrawer();
        this.setState({
            currentPage: VIEW_FREE_PROJECTS,
        });
    };

    onClickCreateProject = () => {
        const path = CREATE_PROJECT_PAGE_PATH;
        browserHistory.push(path);
        this.toggleDrawer();
        this.setState({
            currentPage: CREATE_PROJECT,
        });
    };

    onClickAllTasks = () => {
        const path = VIEW_TASKS_PAGE_PATH;
        browserHistory.push(path);
        this.toggleDrawer();
        this.setState({
            currentPage: VIEW_TASKS,
        });
    };

    onClickFreeTasks = () => {
        const path = VIEW_FREE_TASKS_PAGE_PATH;
        browserHistory.push(path);
        this.toggleDrawer();
        this.setState({
            currentPage: VIEW_FREE_TASKS,
        });
    };

    onClickCreateTask = () => {
        const path = CREATE_TASK_PAGE_PATH;
        browserHistory.push(path);
        this.toggleDrawer();
        this.setState({
            currentPage: CREATE_TASK,
        });
    };

    onClickViewAllReports = () => {
        const path = REPORTS_PAGE_PATH;
        browserHistory.push({pathname:path, state:'0'});
        this.toggleDrawer();
        this.setState({
            currentPage: REPORTS,
        });
    };

    onClickAddReport = () => {
        const path = ADD_REPORT_PAGE_PATH;
        browserHistory.push(path);
        this.toggleDrawer();
        this.setState({
            currentPage: ADD_REPORT,
        });
    };

    onClickViewKPI = () => {
        const path = KPI_PAGE_PATH;
        browserHistory.push(path);
        this.toggleDrawer();
        this.setState({
            currentPage: KPI,
        });
    };

    onClickSignUp = () => {
        const path = REGISTARATION_PAGE_PATH;
        browserHistory.push(path);
        this.toggleDrawer();
        this.setState({
            currentPage: CREATE_NEW_USER,
        });
    };

    setLanguage = (event, child) => {
        localStorage.removeItem(I18);
        localStorage.setItem(I18, event.target.innerText);
        this.props.setLang(event.target.innerText);

        this.setState({
            language: event.target.innerText
        });
    };

    logout = () => {
        this.props.logout();
        this.props.deleteAllFlashMessages();
        this.props.deleteTasks();
        browserHistory.push(EMPTY_PAGE_PATH);
    };


    render = () => {

        const {isAuthenticated} = this.props.auth;
        let userIsDriver = false;
        let userIsAdmin = false;
        let userStatus = '';
        if (isAuthenticated) {
            let userRole = this.props.auth.user.userRole;
            userStatus = this.props.auth.user.userStatus;
            if (userRole === ROLE_DRIVER) {
                userIsDriver = true;
            } else if (userRole === ROLE_ADMIN) {
                userIsAdmin = true;
            }
        }

        const userAppBar = (
            <div>
                <MuiThemeProvider>
                    <AppBar
                        /*title={<img src={require('./img/navigationBarLayout/OrangeryLogo.png')}/>}
                        titleStyle={{color: '#000000', fontSize: '18px'}}*/
                        title='Project management system'
                        style={{backgroundColor: 'aliceblue', zIndex: 990}}
                        titleStyle={{color: '#02162c'}}
                        iconElementLeft={
                            <IconButton iconStyle={{fill: '#000000'}}>
                                <NavigationMenu/>
                            </IconButton>
                        }
                        onLeftIconButtonClick={this.toggleDrawer}
                        children={
                            <Toolbar style={{backgroundColor: 'aliceblue'}}>
                                <ToolbarGroup>
                                    <ToolbarSeparator/>
                                    <IconButton iconStyle={{fill: '#000000'}} onClick={this.logout}>
                                        <ActionPowerSettingsNew/>
                                    </IconButton>
                                </ToolbarGroup>
                            </Toolbar>
                        }
                    >
                    </AppBar>
                </MuiThemeProvider>
            </div>
        );

        const guestAppBar = (
            <MuiThemeProvider>
                <AppBar
                    //title={<img src={require('./img/navigationBarLayout/OrangeryLogo.png')}/>}
                    title='Project management system'
                    style={{backgroundColor: 'aliceblue', zIndex: 990}}
                    titleStyle={{color: '#02162c'}}
                    iconElementLeft={
                        <IconButton iconStyle={{fill: '#000000'}}>
                            <NavigationMenu/>
                        </IconButton>
                    }
                    onLeftIconButtonClick={this.toggleDrawer}
                    children={
                        <Toolbar style={{backgroundColor: 'aliceblue'}}>
                            <ToolbarGroup>
                                <ToolbarSeparator/>
                                <IconMenu
                                    iconButtonElement={
                                        <IconButton>
                                            <NavigationMenu/>
                                        </IconButton>
                                    }
                                    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                                    targetOrigin={{horizontal: 'right', vertical: 'top'}}
                                    iconStyle={{fill: '#000000', marginTop: '2px'}}
                                >
                                    <MenuItem
                                        primaryText="Sign Up"
                                        onClick={this.toggleSignUp}/>
                                    <MenuItem
                                        primaryText="Log In"
                                        onClick={this.toggleLogIn}/>
                                </IconMenu>
                            </ToolbarGroup>
                        </Toolbar>
                    }
                >
                </AppBar>
            </MuiThemeProvider>
        );

        return (
            <div>
                <div className='appbar-main-1'>
                    {isAuthenticated ? userAppBar : guestAppBar}
                    <div className='drower-main-1'>

                        <Modal isOpen={this.state.modalSignUp} toggle={this.toggleSignUp}
                               className={this.props.className}>
                            <ModalBody>
                                <SignUpForm toogle={this.toggleSignUp}/>
                            </ModalBody>
                        </Modal>

                        <Modal isOpen={this.state.modalLogIn} toggle={this.toggleLogIn}
                               className={this.props.className}>
                            <ModalBody>
                                <LogInForm toggleLogIn={this.toggleLogIn}/>
                            </ModalBody>
                        </Modal>

                        <MuiThemeProvider>
                            <Drawer open={this.state.modalDrawer}
                                    docked={false}
                                    onRequestChange={this.toggleDrawer}
                                    overlayStyle={{zIndex: 0, opacity: 0.25}}
                                    containerStyle={{
                                        top: '1px',
                                        zIndex: 99,
                                        position: 'absolute',
                                        backgroundColor: '#ffffff',
                                        height: '1200px'
                                    }}
                            >
                                <div className='drower-main-2'>
                                    <nav
                                        className="navbar navbar-light navbar-expand justify-content-center">
                                        <div className="navbar-collapse collapse w-100" id="collapsingNavbar3">
                                            {isAuthenticated
                                                ?
                                                (userIsDriver ?
                                                        (
                                                            <Menu style={{backgroundColor: '#FFFBF7', width: '100%'}}>

                                                                {(this.props.location.pathname === EMPTY_PAGE_PATH)
                                                                  ?
                                                                  (
                                                                    <MenuItem primaryText="My information"
                                                                              onClick={this.onClickMyInformation}
                                                                              style={{backgroundColor: '#FF8F4F'}}/>
                                                                  ) :
                                                                  (
                                                                    <MenuItem primaryText="My information"
                                                                              onClick={this.onClickMyInformation}/>
                                                                  )
                                                                }

                                                                {(this.props.location.pathname === VIEW_PROJECTS_PAGE_PATH)
                                                                  ?
                                                                  (
                                                                    <MenuItem primaryText="My projects"
                                                                              onClick={this.onClickMylProjects}
                                                                              style={{backgroundColor: '#FF8F4F'}}/>
                                                                  ) :
                                                                  (
                                                                    <MenuItem primaryText="My projects"
                                                                              onClick={this.onClickMylProjects}/>
                                                                  )
                                                                }

                                                                {/*{userStatus === 'FREE' && (*/}
                                                                {/*  (this.props.location.pathname === VIEW_FREE_PROJECTS_PAGE_PATH)*/}
                                                                {/*    ?*/}
                                                                {/*    (*/}
                                                                {/*      <MenuItem primaryText="My projects"*/}
                                                                {/*                onClick={this.onClickAllProjects}*/}
                                                                {/*                style={{backgroundColor: '#FF8F4F'}}/>*/}
                                                                {/*    ) :*/}
                                                                {/*    (*/}
                                                                {/*      <MenuItem primaryText="My projects"*/}
                                                                {/*                onClick={this.onClickAllProjects}/>*/}
                                                                {/*    )*/}
                                                                {/*)*/}
                                                                {/*}*/}

                                                                {(this.props.location.pathname === VIEW_TASKS_PAGE_PATH)
                                                                    ?
                                                                    (
                                                                        <MenuItem primaryText="My tasks"
                                                                                  onClick={this.onClickAllTasks}
                                                                                  style={{backgroundColor: '#FF8F4F'}}/>
                                                                    ) :
                                                                    (
                                                                        <MenuItem primaryText="My tasks"
                                                                                  onClick={this.onClickAllTasks}/>
                                                                    )
                                                                }

                                                                {userStatus === 'FREE' && (
                                                                (this.props.location.pathname === VIEW_FREE_TASKS_PAGE_PATH)
                                                                    ?
                                                                    (
                                                                        <MenuItem primaryText="Free tasks"
                                                                                  onClick={this.onClickFreeTasks}
                                                                                  style={{backgroundColor: '#FF8F4F'}}/>
                                                                    ) :
                                                                    (
                                                                        <MenuItem primaryText="Free tasks"
                                                                                  onClick={this.onClickFreeTasks}/>
                                                                    )
                                                                    )
                                                                }

                                                                {/*From my point of view there is no necessary to show to user all reports*/}
{/*                                                                {(this.props.location.pathname === REPORTS_PAGE_PATH)
                                                                    ?
                                                                    (
                                                                        <MenuItem primaryText="Reports"
                                                                                  onClick={this.onClickViewAllReports}
                                                                                  style={{backgroundColor: '#FF8F4F'}}/>
                                                                    ) :
                                                                    (
                                                                        <MenuItem primaryText="Reports"
                                                                                  onClick={this.onClickViewAllReports}/>
                                                                    )
                                                                }*/}

                                                                {userStatus === 'BUSY' && (
                                                                (this.props.location.pathname === ADD_REPORT_PAGE_PATH)
                                                                    ?
                                                                    (
                                                                        <MenuItem primaryText="Add report"
                                                                                  onClick={this.onClickAddReport}
                                                                                  style={{backgroundColor: '#FF8F4F'}}/>
                                                                    ) :
                                                                    (
                                                                        <MenuItem primaryText="Add report"
                                                                                  onClick={this.onClickAddReport}/>
                                                                    )

                                                                    )}

                                                            </Menu>
                                                        ) :
                                                        (
                                                            <Menu style={{backgroundColor: '#FFFBF7', width: '100%'}}>

                                                                {(this.props.location.pathname === EMPTY_PAGE_PATH)
                                                                    ?
                                                                    (
                                                                        <MenuItem primaryText="My information"
                                                                                  onClick={this.onClickMyInformation}
                                                                                  style={{backgroundColor: '#FF8F4F'}}/>
                                                                    ) :
                                                                    (
                                                                        <MenuItem primaryText="My information"
                                                                                  onClick={this.onClickMyInformation}/>
                                                                    )
                                                                }

                                                                {(this.props.location.pathname === VIEW_ALL_DRIVERS_PAGE_PATH)
                                                                    ?
                                                                    (
                                                                        <MenuItem primaryText="View all employees"
                                                                                  onClick={this.onClickViewAllDrivers}
                                                                                  style={{backgroundColor: '#FF8F4F'}}/>
                                                                    ) :
                                                                    (
                                                                        <MenuItem primaryText="View all employees"
                                                                                  onClick={this.onClickViewAllDrivers}/>
                                                                    )
                                                                }

                                                                {(this.props.location.pathname === REGISTARATION_PAGE_PATH)
                                                                  ?
                                                                  (
                                                                    <MenuItem primaryText="Add new user"
                                                                              onClick={this.onClickSignUp}
                                                                              style={{backgroundColor: '#FF8F4F'}}/>
                                                                  ) :
                                                                  (
                                                                    <MenuItem primaryText="Add new user"
                                                                              onClick={this.onClickSignUp}/>
                                                                  )
                                                                }

                                                                {(this.props.location.pathname === CREATE_PROJECT_PAGE_PATH)
                                                                  ?
                                                                  (
                                                                    <MenuItem primaryText="Create project"
                                                                              onClick={this.onClickCreateProject}
                                                                              style={{backgroundColor: '#FF8F4F'}}/>
                                                                  ) :
                                                                  (
                                                                    <MenuItem primaryText="Create project"
                                                                              onClick={this.onClickCreateProject}/>
                                                                  )
                                                                }

                                                                {(this.props.location.pathname === VIEW_PROJECTS_PAGE_PATH)
                                                                  ?
                                                                  (
                                                                    <MenuItem primaryText="Assign users to projects"
                                                                              onClick={this.onClickAllProjects}
                                                                              style={{backgroundColor: '#FF8F4F'}}/>
                                                                  ) :
                                                                  (
                                                                    <MenuItem primaryText="Assign users to projects"
                                                                              onClick={this.onClickAllProjects}/>
                                                                  )
                                                                }

                                                                {(this.props.location.pathname === CREATE_TASK_PAGE_PATH)
                                                                    ?
                                                                    (
                                                                        <MenuItem primaryText="Create task"
                                                                                  onClick={this.onClickCreateTask}
                                                                                  style={{backgroundColor: '#FF8F4F'}}/>
                                                                    ) :
                                                                    (
                                                                        <MenuItem primaryText="Create task"
                                                                                  onClick={this.onClickCreateTask}/>
                                                                    )
                                                                }

                                                                {(this.props.location.pathname === VIEW_TASKS_PAGE_PATH)
                                                                    ?
                                                                    (
                                                                        <MenuItem primaryText="View all tasks"
                                                                                  onClick={this.onClickAllTasks}
                                                                                  style={{backgroundColor: '#FF8F4F'}}/>
                                                                    ) :
                                                                    (
                                                                        <MenuItem primaryText="View all tasks"
                                                                                  onClick={this.onClickAllTasks}/>
                                                                    )
                                                                }

                                                                {(this.props.location.pathname === REPORTS_PAGE_PATH)
                                                                    ?
                                                                    (
                                                                        <MenuItem primaryText="View all reports"
                                                                                  onClick={this.onClickViewAllReports}
                                                                                  style={{backgroundColor: '#FF8F4F'}}/>
                                                                    ) :
                                                                    (
                                                                        <MenuItem primaryText="View all reports"
                                                                                  onClick={this.onClickViewAllReports}/>
                                                                    )
                                                                }

                                                                {(this.props.location.pathname === KPI_PAGE_PATH)
                                                                  ?
                                                                  (
                                                                    <MenuItem primaryText="KPI"
                                                                              onClick={this.onClickViewKPI}
                                                                              style={{backgroundColor: '#FF8F4F'}}/>
                                                                  ) :
                                                                  (
                                                                    <MenuItem primaryText="KPI"
                                                                              onClick={this.onClickViewKPI}/>
                                                                  )
                                                                }

                                                            </Menu>
                                                        )
                                                )
                                                :
                                                (
                                                    <Menu style={{backgroundColor: '#FFFBF7', width: '100%'}}>

                                                        {(this.props.location.pathname === EMPTY_PAGE_PATH)
                                                            ?
                                                            (
                                                                <MenuItem primaryText="Main Page"
                                                                          onClick={this.onClickMyInformation}
                                                                          style={{backgroundColor: '#FF8F4F'}}/>
                                                            ) :
                                                            (
                                                                <MenuItem primaryText="Main Page"
                                                                          onClick={this.onClickMyInformation}/>
                                                            )
                                                        }
                                                    </Menu>
                                                )
                                            }
                                        </div>
                                    </nav>
                                </div>
                            </Drawer>
                        </MuiThemeProvider>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth,
        location:state.location
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        deleteAllFlashMessages: (data) => dispatch({type: DELETE_ALL_FLASH_MESSAGES, data}),
        logout: (data) => dispatch({type: DELETE_CURRENT_USER, data}),
        deleteTasks: (data) => dispatch({type: DELETE_TASK, data}),
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NavigationBarLayout);

/* https://stackoverflow.com/questions/19733447/bootstrap-navbar-with-left-center-or-right-aligned-items/20362024#20362024
https://github.com/mui-org/material-ui/issues/5358 */

