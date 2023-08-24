import './App.css';
import { createBrowserHistory } from 'history';
import { Router, Switch } from 'react-router';
import { HomeTemplate } from './templates/HomeTemplate/HomeTemplate'
import Home from './pages/Home/Home';
import News from './pages/News/News';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import CheckoutTemplate from './templates/CheckoutTemplate/CheckoutTemplate';
import { UserTemplate } from './templates/UserTemplate/UserTemplate';
import Loading from './components/Loading/Loading';

import Dashboard from './pages/Admin/Dashboard/Dashboard';
import AdminTemplate from './templates/AdminTemplate/AdminTemplate';
import Films from './pages/Admin/Films/Films';
import ShowTime from './pages/Admin/Showtime/ShowTime';
import AddNew from './pages/Admin/Films/AddNew/AddNew';
import Edit from './pages/Admin/Films/Edit/Edit';
import User from './pages/Admin/User/User';
import EditUser from './pages/Admin/User/EditUser/EditUser';
import AddUser from './pages/Admin/User/AddUser/AddUser';
import { HomeTemplateOther } from './templates/HomeTemplate/HomeTemplateOther';
import ProfileTabs from './pages/Profile/Profile';
import DetailVer from './pages/Detail/DetailVer';
import Checkoutver from './pages/Checkout/Checkoutver';
import Modal from './components/Modal/Modal';
import PageNotFound from './components/PageNotFound/PageNotFound';
import NewItem from './pages/News/NewItem/NewItem';



export const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <Loading />
      <Modal />
      <Switch>

        <AdminTemplate path="/admin" exact Component={Dashboard} />
        <AdminTemplate path="/admin/films" exact Component={Films} />
        <AdminTemplate path="/admin/films/addnew" exact Component={AddNew} />
        <AdminTemplate path="/admin/films/edit/:id" exact Component={Edit} />
        <AdminTemplate path="/admin/films/showtime/:id/:tenphim" exact Component={ShowTime} />

        <AdminTemplate path="/admin/users" exact Component={User} />
        <AdminTemplate path="/admin/users/edit/:taiKhoan" exact Component={EditUser} />
        <AdminTemplate path="/admin/users/adduser" exact Component={AddUser} />

        <HomeTemplate path="/news" exact Component={News} />
        <HomeTemplateOther path="/news/:id" exact Component={NewItem} />
        <HomeTemplate path="/detail/:id" exact Component={DetailVer} />
        <HomeTemplateOther path="/profile" exact Component={ProfileTabs} />
        <CheckoutTemplate path="/checkout/:id" exact component={Checkoutver} />
        <UserTemplate path="/login" exact Component={Login} />
        <UserTemplate path="/register" exact Component={Register} />
        <HomeTemplate path="/home" exact Component={Home} />
        <HomeTemplate path="/" exact Component={Home} />

        <HomeTemplateOther path="*" Component={PageNotFound} />
      </Switch>
    </Router>
  );
}

export default App;



