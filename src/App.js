import './App.css';

import Navbar from './components/Navbar';
import Home from './components/Home';
import Contact from './components/Contact';
import Login from './components/Login';
import Signup  from "./components/Signup";
import Footer from './components/Footer';
import Team from './components/Team';
import NoteState from './context/notes/NoteState';
import Userotp from './components/Userotp';
import Addcar from './components/AddCar';

import BookingCar from './components/BookingCar';

import Profile from './components/Profile';
import Farmer from './components/Farmer';
import Tourist from './components/Tourist';
import Blog from './components/Blog';
import { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import AllBlog from './components/AllBlog';
import BlogDetail from './components/BlogDetail';
import Addteam from './components/Addteam';
import Chatbot from 'react-simple-chatbot';
import History from './components/History';
import AllCarDisplay from './components/AllCarDisplay';
import AllBookings from './components/AllBookings';
import Dashboard from './components/Dashboard';
import Forgotpassword from './components/Forgotpassword';
import ResetPassword from './components/ResetPassword';

function App() {
  const [chatbotVisible, setChatbotVisible] = useState(false);

  const toggleChatbot = () => {
    setChatbotVisible(!chatbotVisible);
  };

  const [name, setName] = useState('');

  const steps = [
    {
      id: 'Greet',
      message: 'Hello, Welcome to VishwaRacers Baja',
      trigger: 'AskName',
    },
    {
      id: 'AskName',
      message: "What's your name?",
      trigger: 'WaitingForName',
    },
    {
      id: 'WaitingForName',
      user: true,
      trigger: 'Name',
    },
    {
      id: 'Name',
      message: ({ previousValue }) => {
        setName(previousValue);
        return `Hi ${previousValue}, How can I help you?`;
      },
      trigger: 'IssueSelection',
    },
    {
      id: 'IssueSelection',
      options: [
        { value: 'What We actually Do?', label: 'What We actually Do?', trigger: 'ProfessionalIssue' },
        { value: 'More About Club !', label: 'More About Club !', trigger: 'ClubIssue' },
        { value: 'Services we provide..', label: 'Services we provide..', trigger: 'ServiceIssue' },
      ],
    },
    {
      id: 'ProfessionalIssue',
      message: 'We Create and Develop Automobile for Farmers, Tourists as well as Managers.',
      trigger:'IssueSelection',
    },
    {
      id: 'ClubIssue',
      message: 'We are Vishwaracers Baha located at Vishwakarma Institute of Information Technology, Pune',
      trigger:'IssueSelection',
    },
    {
      id: 'ServiceIssue',
      message: 'We Provide services for farmers,tourists and managers to buy a car and maintain their servicing',
      trigger:'IssueSelection',
    },
  ];
  

  return (
    <>
      <NoteState>
        <Router>
          <Navbar/>
          <div className='router-container'>
            <Routes>
                <Route exact path="/home" element={<Home/>} />
                <Route exact path="/add-car" element={<Addcar/>} />
                <Route exact path="/" element={<Home/>} />
                <Route exact path="/contact" element={<Contact/>} />
                <Route exact path="/team" element={<Team/>} />
                <Route exact path="/login" element={<Login/>} />
                <Route exact path="/signup" element={<Signup/>} />
                <Route exact path="/otp" element={<Userotp />}/>
                <Route exact path="/farmer" element={<Farmer />}/>
                <Route exact path="/booking/:id" element={<BookingCar />} />
                <Route exact path="/allcars" element={<AllCarDisplay />}/>
                <Route exact path="/tourist" element={<Tourist />}/>
                <Route exact path="/profile" element={<Profile />}/>
                <Route exact path="/blog" element={<Blog />}/>
                <Route exact path="/allblog" element={<AllBlog />}/>
                <Route exact path="/blogs/:id" element={<BlogDetail/>} />
                <Route exact path="/addteam" element={<Addteam />}/>
                <Route exact path="/history" element={<History />} />
                <Route exact path="/allbookings" element={<AllBookings />} />
                <Route exact path="/dashboard" element={<Dashboard />} />
                <Route path = '/forgotpassword' element={<Forgotpassword/>} />
                <Route path = '/reset-password/:id/:token' element={<ResetPassword/>} />
            </Routes>
          </div>
          <div className="top-redirector">
            <a href="#" style={{"textDecoration":"none"}}>
              <div title='Redirect to Top' className="chatbot-icon">
                <i class="fa-solid fa-arrow-up"></i>
              </div>
            </a>
          </div>

          <div className="chatbot-container">
            {chatbotVisible ? (
              <div className="chatbot-window">
                <div className="chatbot-header">
                  
                  <button className="chatbot-icon" onClick={toggleChatbot}>
                    <i className="fa-solid fa-times"></i>
                  </button>
                </div>
                <div className="chatbot-content">
                  <Chatbot
                    steps={steps}
                    hideUserAvatar={false}
                    
                  />
                </div>
              </div>
            ) : (
              <div title='Chat With Us' className="chatbot-icon" onClick={toggleChatbot}>
                <i className="fa-solid fa-message messageIcon"></i>
              </div>
            )}
          </div>
          <Footer/>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
