import React from 'react';
import {Icon, Segment} from "semantic-ui-react";
import GoogleMapReact from 'google-map-react';

function Marker() {
    return (<Icon name={'marker'} size={'big'} color={'red'}/>)
}

const ProfileMap = ({latLng}) => {


    return (
        <Segment attached={'bottom'} style={{padding: 0}}>
            <div style={{height: 300, width: '100%'}}>
                <GoogleMapReact
                    bootstrapURLKeys={{key: 'AIzaSyDueWXOOU3faxcqVKkJr16w-WTIu-w2p-o'}}
                    center={latLng}
                    zoom={14}

                >
                    <Marker lat={latLng.lat} lng={latLng.lng}/>

                </GoogleMapReact>
            </div>
        </Segment>
    );
};

export default ProfileMap;
