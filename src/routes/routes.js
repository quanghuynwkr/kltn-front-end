//Pages
import Home from '~/pages/Home/';
import Login from '~/pages/Login/';
import Register from '~/pages/Register/';
import Profile from '~/pages/Profile/';
import BoardUser from '~/pages/BoardUser/';
import BoardEvent from '~/pages/BoardEvent/';

//Layout
import { LoginLayout } from '~/layouts';

//config
import config from '~/config/';
import ProfileEdit from '~/pages/ProfileEdit';

//public routes:
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.login, component: Login, layout: LoginLayout },
    { path: config.routes.register, component: Register, layout: LoginLayout },
    { path: config.routes.profile, component: Profile },
    { path: config.routes.profileEdit, component: ProfileEdit },
    { path: config.routes.boardUsers, component: BoardUser },
    { path: config.routes.boardEvents, component: BoardEvent },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
