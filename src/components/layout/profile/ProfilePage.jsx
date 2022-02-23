import React from 'react';
import {Divider, Tab} from 'semantic-ui-react'
import ProfileHeader from "./ProfileHeader";
import ProfilePost from "./ProfilePost";


// {menuItem: 'Add Category', render: () => <CategoryForm/>},



const ProfilePage = () => {

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

            <ProfileHeader/>

            <Divider hidden/>
            <Tab
                menu={{color: 'purple', inverted: true, attached: false, tabular: false}}
                panes={panes}
            />
        </div>
    );
};

export default ProfilePage;
