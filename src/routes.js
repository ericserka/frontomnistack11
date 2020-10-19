import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Logon from './pages/logon'; //não precisa colocar o /index porque pelo nome do arquivo ser index, ele fica subtendido
import Register from './pages/register';
import Profile from './pages/profile';
import NewIncident from './pages/newIncident';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Logon}/> {/*o exact é necessário para assim a pagina de logon só aparecer quando o path for exatamente igual a "/"; dessa forma os outros paths tbm funcionarão normalmente*/}
                <Route path="/register" component={Register}/>
                <Route path="/profile" component={Profile}/>
                <Route path="/incidents/new" component={NewIncident}/>
            </Switch>
        </BrowserRouter>
    );
}