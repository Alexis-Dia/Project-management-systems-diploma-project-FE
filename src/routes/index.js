import CoreLayout from '../layouts/pageLayout/PageLayout'
import Home from './home'

import Drivers from './drivers'
import Cars from './cars'
import CreateCar from './createCar'
import Projects from './projects'
import CreateProject from './createProject'
import Tasks from './tasks'
import FreeTasks from './freeTasks'
import CreateTask from './createTask'
import Reports from './reports'
import ReportsById from './reportsById'
import CreateReport from './createReport'
import SignUp from './signUp'

import {
    ADD_REPORT_PAGE_PATH,
    CREATE_CAR_PAGE_PATH,
    CREATE_PROJECT_PAGE_PATH,
    CREATE_TASK_PAGE_PATH,
    EMPTY_PAGE_PATH,
    REPORTS_PAGE_PATH,
    VIEW_ALL_DRIVERS_PAGE_PATH,
    VIEW_CARS_PAGE_PATH,
    VIEW_FREE_PROJECTS_PAGE_PATH,
    VIEW_FREE_TASKS_PAGE_PATH,
    VIEW_PROJECTS_PAGE_PATH,
    VIEW_TASKS_PAGE_PATH
} from "../properties/properties";

export const createRoutes = (store) => ({
        childRoutes: [
            {
                path: EMPTY_PAGE_PATH,
                component: CoreLayout,
                indexRoute: Home,
                childRoutes: []
            },

            {
                path        : VIEW_ALL_DRIVERS_PAGE_PATH,
                component   : CoreLayout,
                indexRoute  : Drivers,
                childRoutes : [
                ]
            },

            {
                path        : VIEW_CARS_PAGE_PATH,
                component   : CoreLayout,
                indexRoute  : Cars,
                childRoutes : [
                ]
            },

            {
                path        : CREATE_CAR_PAGE_PATH,
                component   : CoreLayout,
                indexRoute  : CreateCar,
                childRoutes : [
                ]
            },

            {
                path        : VIEW_PROJECTS_PAGE_PATH,
                component   : CoreLayout,
                indexRoute  : Projects,
                childRoutes : [
                ]
            },

            {
                path        : CREATE_PROJECT_PAGE_PATH,
                component   : CoreLayout,
                indexRoute  : CreateProject,
                childRoutes : [
                ]
            },

            {
                path        : VIEW_TASKS_PAGE_PATH,
                component   : CoreLayout,
                indexRoute  : Tasks,
                childRoutes : [
                ]
            },

            {
                path        : VIEW_FREE_TASKS_PAGE_PATH,
                component   : CoreLayout,
                indexRoute  : FreeTasks,
                childRoutes : [
                ]
            },

            {
                path        : CREATE_TASK_PAGE_PATH,
                component   : CoreLayout,
                indexRoute  : CreateTask,
                childRoutes : [
                ]
            },

            {
                path        : '/reports',
                component   : CoreLayout,
                indexRoute  : Reports,
                childRoutes : [
                ]
            },

            {
                path        : '/reports/:id',
                component   : CoreLayout,
                indexRoute  : ReportsById,
                childRoutes : [
                ]
            },

            {
                path        : ADD_REPORT_PAGE_PATH,
                component   : CoreLayout,
                indexRoute  : CreateReport,
                childRoutes : [
                ]
            },

            {
                path        : '/signUp',
                component   : CoreLayout,
                indexRoute  : SignUp,
                childRoutes : [
                ]
            },
        ]
    }
);

export default createRoutes
