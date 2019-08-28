import React, { useState, useEffect } from "react";

// SERVICE API
import DataService from '../services/DataService';
import Calculations from '../services/Calculations';

// COMPONENTS
import HeaderHome from '../HEADERS/HeaderHome';
import JamsList from './JamsList';
import Jam from './Jam';

// CSS
import './index.css'; 

const Home = (props) => {

    const [userJams, setUserJams] = useState([]);
    const [jamId, setJamId] = useState('');
    const [user, setUser] = useState({});
    const { userId } = props;


    const fetchData = () => {
        DataService.getUserInfoById(userId)
        .then(result =>{
            console.log('result con el snapshot =', result)
          setUser({
            id: userId, 
            name: result.userName, 
            email: result.email
          });
            console.log('result del user ', result)
        });

        DataService.getUserJams(userId)
        .then(result =>{
           // setUserJams(result)
           console.log('userJams received ', result)
           //const userJamsSorted = Calculations.sortByDateDesc(userJams)

        });
    }

    useEffect(() => {
        fetchData()
        if(props.user !== user) {
            setUser(props.user)
        }
    },[]);

    const updateJamScreen = (jamId) => {
        console.log('update en el Home, jamId = ', jamId);
        setJamId(jamId)
    };

    return (

        <div className="home-logged">
            <div className="header-home">
                <HeaderHome 
                user= {user} 
                />
            </div>
            
            <div className="home-body">
                <aside className="jams-list">
                    <JamsList 
                        user={user} 
                        updateJamScreenInHome={updateJamScreen} 
                        userJams={userJams}
                    />
                </aside>

                <div className="jam-screen">
                
                    <Jam 
                        jamId= {jamId}
                        user={user}
                        updateJamIdInHome={updateJamScreen}
                        userJams={userJams}
                    /> 
                    
                </div>
            </div>
        </div>
        
    );
}

export default Home;