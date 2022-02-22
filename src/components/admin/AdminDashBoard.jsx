import React from 'react';
import {Header, Icon, Tab} from "semantic-ui-react";
import CategoryForm from "./CategoryForm";
import CategoryTable from "./CategoryTable";

const panes = [
    {menuItem: 'Add Category', render: () => <CategoryForm/>},
    {menuItem: 'See status', render: () => <CategoryTable/>},
    {menuItem: 'Check User', render: () => <Tab.Pane>Tab 3 Content</Tab.Pane>},
]

const AdminDashBoard = () => {


    return (
        <div>
            <Header as='h2' icon textAlign='center'>
                <Icon name='users' circular/>
                <Header.Content>Admin Manager</Header.Content>
            </Header>
            <Tab color={'red'} menu={{fluid: true, vertical: true, tabular: true}} panes={panes}/>

        </div>
    );
};

export default AdminDashBoard;
