import logo from './logo.svg';
import './App.css';
import { Routes, Route } from "react-router-dom";
import SignIn from "./Signin/signin";
import SignUp from "./Signup/signup";
import UserProfile from "./Userprofile/userprofile";
import Progressbar from './Components/Progress bar/Progress_bar';
import UserProfile2 from "./Userprofile/userprofile2.js";
<<<<<<< Updated upstream
import Homepage from './Dashboard/Homepage';
import Filloutmyworkprofile from './Dashboard/Filloutmyworkprofile';
import Setuppayment from './Dashboard/Setuppayment';
import Consultationtable from './Dashboard/Consultationtable';
// import UserProfile3 from "./Userprofile/userprofile3.js";
=======
import UserProfile3 from "./Userprofile/userprofile3.js";
import Appointment1 from "./Appointment/appointment1.js";
>>>>>>> Stashed changes

function App() {
  return (
    <div className="App">
      <Routes>
<<<<<<< Updated upstream
        <Route path="/" element={<SignIn />}/>
        <Route path="/signup" element={<SignUp />}/>
        <Route path="/userprofile" element={<UserProfile />}/>
        <Route path="/userprofile2" element={<UserProfile2 />}/>
        <Route path="/home" element={<Homepage />}/>
        <Route path="/filloutmyworkprofile" element={<Filloutmyworkprofile/>}/>
        <Route path="/setuppayment" element={<Setuppayment/>}/>
        <Route path="/consultation" element={<Consultationtable/>}/>
=======
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/userprofile2" element={<UserProfile2 />} />
        <Route path="/userprofile3" element={<UserProfile3 />} />
        <Route path="/appointment1" element={<Appointment1 />} />
>>>>>>> Stashed changes
      </Routes>
    </div>
  );
}

export default App;
