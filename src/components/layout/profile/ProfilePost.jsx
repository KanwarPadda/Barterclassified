import React from 'react'
import { Card } from 'semantic-ui-react'

const src = 'https://react.semantic-ui.com/images/wireframe/white-image.png'

const ProfilePost = () => (
    <Card.Group itemsPerRow={3}>
        <Card color='red' image={src} />
        <Card color='orange' image={src} />
        <Card color='yellow' image={src} />
        <Card color='olive' image={src} />
        <Card color='green' image={src} />
        <Card color='teal' image={src} />
        <Card color='blue' image={src} />
        <Card color='violet' image={src} />
        <Card color='purple' image={src} />
        <Card color='pink' image={src} />
        <Card color='brown' image={src} />
        <Card color='grey' image={src} />
    </Card.Group>
)
export default ProfilePost