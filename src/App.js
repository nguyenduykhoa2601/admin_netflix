
import { Grid } from '@material-ui/core';

import { useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import AddLists from './components/AddLists/AddLists';
import AddMovies from './components/AddMovies/AddMovies';
import Login from './components/Auth/Login';
import Home from './components/Home/Home';
import Lists from './components/Lists/Lists';
import Menu from './components/Menu/Menu';
import Movies from './components/Movies/Movies';
import Loading from './components/utils/Loading/Loading';
import NotFound from './components/utils/NotFound/NotFound'
import { GlobalState } from './GlobalState';
function App() {
    const state = useContext(GlobalState)
    const [isLogged, setIsLogged] = state.userAPI.isLogged

  
    const logoutAdmin = () => {
        localStorage.removeItem('admin')
        setIsLogged(false)
        window.location.href = "/"
    }
    return (
        <Router>
            <div className="App">
                {
                    isLogged ?
                        <div className="grid">
                            <div className="admin__header">
                                <h1 className="admin__heading"> Chào mừng ADMIN </h1>
                                <div className="admin__detail">
                                    <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq3NS4baxxGkWqPUANiAUWTZRWvseb4gFAwSerCFmUPEtLrWhqydfWnRDATiacD6MCSHo&usqp=CAU' alt="" />
                                    <div className="admin__name">{localStorage.getItem('adName')}</div>
                                    <button onClick={logoutAdmin}>Đăng xuất</button>
                                </div>
                            </div>
                            <Grid container spacing={1}>
                                <Grid item sm={3} xs={3}>
                                    <Menu />
                                </Grid>
                                <Grid item sm={9} xs={3}>
                                    <Switch>
                                        <Route path="/" exact component={Home} />
                                        <Route path="/movies" exact component={Movies} />
                                        <Route path="/lists" exact component={Lists} />
                                        <Route path="/addmovies" exact component={AddMovies} />
                                        <Route path="/edit_movie/:id" exact component={AddMovies} />
                                        <Route path="/addlists" exact component={AddLists} />
                                        <Route path="/edit_list/:id" exact component={AddLists} />
                                        <Route path="/x" exact component={Loading} />
                                        <Route path="*" exact component={NotFound} />
                                    </Switch>
                                </Grid>
                            </Grid>
                        </div>
                        :
                        <Route path="/" exact component={Login} />

                }

            </div>
        </Router>

    );
}

export default App;
