import React from 'react'
import { Grid, Image } from 'semantic-ui-react'

const ProfileHeader = () => (
    <Grid>
        <Grid.Column width={4}>
            <Image src='https://react.semantic-ui.com/images/wireframe/white-image.png' />
        </Grid.Column>
        <Grid.Column width={3}>
            <Image src='https://react.semantic-ui.com/images/wireframe/white-image.png' />
        </Grid.Column>
    </Grid>
)

export default ProfileHeader