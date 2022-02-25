import React from 'react';
import {Divider, Tab} from 'semantic-ui-react'
import ProfileHeader from "./ProfileHeader";
import ProfilePost from "./ProfilePost";
import {useSelector} from "react-redux";
import './profileStyles.css'


const ProfilePage = () => {

    const {currentUser} = useSelector(state => state.auth);


    const panes = [
        {
            menuItem: 'Posts',
            render: () => <Tab.Pane attached={false}> <ProfilePost/> </Tab.Pane>,
        },
        {
            menuItem: 'PurChases',
            render: () => <Tab.Pane attached={false}><ProfilePost/></Tab.Pane>,
        },
        {
            menuItem: 'Barter',
            render: () => <Tab.Pane attached={false}><ProfilePost/></Tab.Pane>,
        },
    ]

    return (
        <div>


            <ProfileHeader currentUser={currentUser}/>


            <Divider hidden/>
            <Tab
                menu={{color: 'purple', inverted: true, attached: false, tabular: false}}
                panes={panes}
            />
        </div>
    );
};

export default ProfilePage;
