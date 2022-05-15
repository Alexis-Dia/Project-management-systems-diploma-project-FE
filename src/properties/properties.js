export const POST = 'POST';
export const GET = 'GET';
export const DELETE = 'DELETE';
export const PUT = 'PUT';

//export const HOSTNAME = '172.16.1.129'
//export const HOSTNAME = '172.16.1.42';
export const HOSTNAME = 'localhost'
//export const PORT = 8881;
export const PORT = 8080

export const PATH_METHOD_AUTH_AUTHENTICATE = '/auth/authenticate';
export const PATH_METHOD_GET_ALL_EMPLOYEES = '/user/allEmployees';
export const PATH_METHOD_SIGN_UP = '/user/signUp';

export const PATH_METHOD_GET_ALL_CARS = '/car/all';
export const PATH_METHOD_GET_ALL_FREE_CARS = '/car/allFree';
export const PATH_METHOD_POST_CREATE_NEW_CAR = '/car/addNew';
export const PATH_METHOD_GET_ALL_BRANDS = '/brand/all';

export const PATH_METHOD_GET_ALL_TASKS = '/task/all';
export const PATH_METHOD_GET_MINE_TASKS = '/task/loadAllMine';
export const PATH_METHOD_GET_FREE_TASKS = '/task/byStatus?taskStatus=FREE';
export const PATH_METHOD_POST_CREATE_TASK = '/task/createNew';
export const PATH_METHOD_TAKE_TASK = '/task/takeTask';
export const PATH_METHOD_CHANGE_TASK_STATUS_TO_VALIDATED = '/task/changeTaskStatusToValidated';
export const PATH_METHOD_CHANGE_TASK_STATUS_TO_FINISHED = '/task/changeTaskStatusToFinish';

export const PATH_METHOD_GET_ALL_PROJECTS = '/project/load';
export const PATH_METHOD_GET_MINE_PROJECTS = '/project/loadAllMine';
export const PATH_METHOD_GET_FREE_PROJECTS = '/project/byStatus?taskStatus=FREE';
export const PATH_METHOD_POST_CREATE_PROJECT = '/project/create';
export const PATH_METHOD_TAKE_PROJECT = '/project/takeProject';
export const PATH_METHOD_CHANGE_PROJECT_STATUS_TO_VALIDATED = '/task/changeProjectStatusToValidated';
export const PATH_METHOD_CHANGE_PROJECT_STATUS_TO_FINISHED = '/task/changeProjectStatusToFinish';

export const PATH_METHOD_GET_ALL_REPORTS = '/report/all';
export const PATH_METHOD_GET_REPORTS_BY_TASK_ID = '/report/getByTaskId?taskId=';
export const PATH_METHOD_POST_CREATE_REPORT = '/report/createReport/';

export const HTTPS = 'HTTPS://';
export const HTTP = 'HTTP://';
export const WS = '/ws';
export const DELIMITER = ':';
export const ALARM_MAIN_TOPIC = '/alarm/new';

export const PAGE_STATUS_200 = 200;
export const PAGE_STATUS_500 = 500;
export const PAGE_STATUS_UNDEFINED = 'undefined';

export const APPLICATION_JSON = 'application/json';
export const JSON = 'json';
export const BEARER = 'Bearer ';

export const ENCODING_UTF8 = 'utf8';
export const SESSION_TIME_IN_SECONDS = 8;
export const SECONDS_IN_MINUTE = 60;
export const MILLISECONDS_IN_SECOND = 1000;

export const TIME_OF_LOG_IN_POP_UP = 3500;
export const TIME_OF_ASKING_QUESTION_POP_UP = 3500;
export const TIME_OF_SHOWING_UP_ADDED_COMMENTS = 1500;
export const TIME_OF_WAITING_AFTER_ASKING = 1500;
export const TIME_OF_NEW_ALARM_POP_UP = 15000;
export const TIME_OF_RESOLVED_ALARM = 5000;

export const INDEX_OF_FIRST_POAGE = 0;
export const MAX_INT_SIZE = 32677;

export const UTC_MIN_TIME_DATA = "2001-01-01 00:00:00";
export const MINUTES = "minutes";
export const TWO_HOURS_OFFSET_IN_MINUTES = -120;
export const SIX_HOURS_OFFSET_IN_MINUTES = -360;
export const TWENY_FOUR_HOURS_OFFSET_IN_MINUTES = -1440;
export const WEEK_OFFSET_IN_MINUTES = -34560;

export const JWT_TOKEN = 'jwtToken';
export const LANGUAGE_DEFAULT = 'EN';
export const RU = 'RU';
export const EN = 'EN';
export const I18 = 'i18';
export const MIN_NUMBERS_OF_CHARACTERS_IN_QUESTION = 20;
export const MIN_NUMBERS_OF_CHARACTERS_IN_COMMENT = 5;
export const EMPTY_STRING = '';
export const EMPTY_STRING_OBJECT = '{}';
export const STRING_DASH = '-';

export const POP_UP_MESSAGE_TYPE_PRIMARY = 'primary';

export const EMPTY_PAGE_PATH = '/';
export const REGISTARATION_PAGE_PATH = '/signUp';
export const VIEW_ALL_DRIVERS_PAGE_PATH = '/viewDrivers';
export const VIEW_CARS_PAGE_PATH = '/viewCars';
export const CREATE_CAR_PAGE_PATH = '/createCar';

export const VIEW_PROJECTS_PAGE_PATH = '/viewProjects';
export const VIEW_MY_PROJECTS_PAGE_PATH = '/viewMyProjects';
export const CREATE_PROJECT_PAGE_PATH = '/createProject';

export const VIEW_FREE_PROJECTS_PAGE_PATH = '/viewFreeProjects';
export const VIEW_TASKS_PAGE_PATH = '/viewTasks';
export const VIEW_FREE_TASKS_PAGE_PATH = '/viewFreeTasks';
export const CREATE_TASK_PAGE_PATH = '/createTask';
export const REPORTS_PAGE_PATH = '/reports';
export const ADD_REPORT_PAGE_PATH = '/addReport';

export const INFORMATION = 'MyInformation';
export const VIEW_ALL_DRIVERS = 'ViewAllDrivers';
export const REPORTS = 'Reports';
export const CREATE_CAR = 'CreateCar';
export const VIEW_CARS = 'ViewCars';
export const VIEW_PROJECTS = 'ViewProjects';
export const VIEW_MY_PROJECTS = 'ViewMyProjects';
export const VIEW_FREE_PROJECTS = 'ViewFreeProjects';
export const VIEW_TASKS = 'ViewTasks';
export const VIEW_FREE_TASKS = 'ViewFreeTasks';
export const CREATE_TASK = 'CreateTask';
export const ADD_REPORT = 'Add report';

export const ROLE_DRIVER = 'USER';
export const ROLE_ADMIN = 'ADMIN';

export const DEFAULT_ORDERING_PARAMETERS = {
    'page': 0,
    'size': 10,
    'orders' : [
        {
            'property' : 'resolved',
            'priority' : 1,
            'direction' : 'ASC'
        },
        {
            'property' : 'alarmDate',
            'priority' : 2,
            'direction' : 'DESC'
        }
    ]
};

export const DEFAULT_COORDINATES = {
    latitude: 39,
    longitude: -100
};

export const DEFAULT_FILTERING_PARAMETERS = {
    page: 0,
    size: 5,

    iso8601FromFilter: '',
    dateFromFilter: null,
    timeFromFilter: '00:00:00',
    iso8601ToFilter: '',
    dateToFilter: null,
    timeToFilter: '00:00:00',
    patientNameFilter: '',
    deviceIdFilter: null,
    alarmTypeFilter: null,
    batteryVoltageFromFilter: '',
    batteryVoltageToFilter: '',
    speedFromFilter: '',
    speedToFilter: '',
    resolvedFilter: null
};

export const FILTERS_OF_NAME = {
    PatientName:'PatientName',
    DeviceId:'DeviceId',
    AlarmType:'AlarmType',
    DateTimeAll:'DateTimeAll',
    BatterryVoltageAll:'BatterryVoltageAll',
    SpeedAll:'SpeedAll',
    ResolveAlarm:'ResolveAlarm',
};

export const DEVICE_DEFAULT_ORDERING_PARAMETERS = {
    'page': 0,
    'size': 10,
    'orders' : [
        {
            'property' : 'deviceId',
            'priority' : 1,
            'direction' : 'ASC'
        },

    ]
};

export const PATIENT_DEFAULT_ORDERING_PARAMETERS = {
    'page': 0,
    'size': 2,
    'orders' : [
        {
            'property' : 'city',
            'priority' : 1,
            'direction' : 'ASC'
        },

    ]
};

export const DATE_TIME_FORMAT_DEFAULT = "YYYY/MM/DD HH:mm";

export const UTC_FORMAT = "YYYY-MM-DD HH:mm:ss";

export const DATE_TIME_MASK = [
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    "/",
    /\d/,
    /\d/,
    "/",
    /\d/,
    /\d/,
    " ",
    /\d/,
    /\d/,
    ":",
    /\d/,
    /\d/,
]
