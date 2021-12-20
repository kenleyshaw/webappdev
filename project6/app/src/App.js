/* import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload :) .
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
*/

import * as React from "react";
import {fetchUtils, Admin, Resource} from 'react-admin';
import ReactDOM from 'react-dom';
import RestClient from './RestClient.js';

import {StudentsList, StudentsCreate, StudentsEdit, StudentsShow} from './Students';
import {GradesList, GradesEdit, GradesCreate} from './Grades';
import GradesTable from './GradesTable';
import dataProvider from './RestClient';


const httpClient = (url, options = {}) => {
	options.user = {
		authenticated: true,
		token: 'Basic '+btoa('teacher:testing')
	};
	return fetchUtils.fetchJson(url,options);
};

const App = () => (
	<Admin dataProvider={RestClient('/project5', httpClient)}>
		<Resource name="students" list={StudentsList} show={StudentsShow} edit={StudentsEdit} create={StudentsCreate}/>
		<Resource name="grades" list={GradesList} edit={GradesEdit} create={GradesCreate}/>
	</Admin>
);

export default App;
