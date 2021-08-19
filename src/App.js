import './App.css';
import Amplify, { API } from 'aws-amplify'

import awsExports from "./aws-exports";
Amplify.configure(awsExports);

function App() {
  return (
    <div className="App">
      <header className="App-header">
          Hello AWS Amplify
      </header>
    </div>
  );
}

export default App;
