import React, {useState} from 'react'
import {Button, Grid, Header, Image} from 'semantic-ui-react'
import ProfileMap from "./ProfileMap";
import {useSelector} from "react-redux";
import LoadingComponent from "../LoadingComponent";

const ProfileHeader = ({currentUser}) => {
    const [show,setShow] = useState(false)

    const {loading} = useSelector(state =>state.auth)

    if(loading) return <LoadingComponent/>

    return (


        <Grid>
            <Grid.Column width={4}>
                <Image src={currentUser.profilePic}/>


                <Header as={'h2'} content={`${currentUser.firstname} ${currentUser.lastname}`}/>
                <p> Date Joined :{currentUser.accountCreated}</p>
                Birthday: {
                `${currentUser.birthday.date.toString()}-${currentUser.birthday.month.toString()}-${currentUser.birthday.year.toString()}
                `
            }
                Email:{currentUser.email}


            </Grid.Column>
            <Grid.Column width={4}>
                Address : {currentUser.location.address}
<br/>
                <Button onClick={() => setShow(!show)}
                        color={'teal'} size={'tiny'}
                        content={show ? 'Hide Map' : 'Show map'}
                />
                {show && <ProfileMap latLng={currentUser.location.latLng}/> }
            </Grid.Column>
        </Grid>
    );
}

export default ProfileHeader