import React from 'react';
import {Header, Icon, Tab} from "semantic-ui-react";
import CategoryForm from "./CategoryForm";
import CategoryTable from "./CategoryTable";

const panes = [
    {menuItem: 'Add Category', render: () => <CategoryForm/>},

]

const AdminDashBoard = () => {


    return (
        <div>
            <Header as='h2' icon textAlign='center'>


                <Header.Content>Admin Manager</Header.Content>

            </Header>
            <Tab color={'red'} menu={{fluid: true, vertical: true, tabular: true}} panes={panes}/>

        </div>
    );
};

export default AdminDashBoard;
