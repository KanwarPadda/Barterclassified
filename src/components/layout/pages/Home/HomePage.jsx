import React from 'react';
import {Button, Container, Header, Icon, Segment} from "semantic-ui-react";


import {useHistory} from "react-router-dom";
import TypeWriter from "react-typewriter/build/react-typewriter.es2015";

const HomePage = () => {
    const history = useHistory();

    return (

        <Segment inverted textAlign="center" vertical className="masthead">
            <Container>
                <Header as={'h1'} inverted>
                    The Barter Classified
                    <Header as={'p'} inverted>
                        <TypeWriter maxDelay={800} typing={1}>Buy, </TypeWriter>
                        <TypeWriter maxDelay={800} typing={2}> Sell &</TypeWriter>
                        <TypeWriter maxDelay={800} typing={3}>Trade Items</TypeWriter>
                    </Header>
                </Header>

                <div>

                    <Button className={'option'} onClick={() => history.push('/featured')} size={'huge'} inverted>
                        Start Bartering
                        <Icon name="right arrow" inverted/>
                    </Button>
                </div>
            </Container>

        </Segment>

    );
};

export default HomePage;