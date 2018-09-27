import React, { Component } from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {Container, Icon, List, Segment,} from 'semantic-ui-react'

class FooterComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        const { menuFixed} = this.state;
        return (
            <Segment inverted className='footer' vertical>
                <Container textAlign='center'>
                    <List horizontal inverted divided link>
                        <List.Item as='a' href='https://github.com/erdemkepenek/Soen343Project'>
                            Github <Icon name='github' />
                        </List.Item>
                        <List.Item>
                            Soen343Project <Icon name='copyright' />
                        </List.Item>
                    </List>
                </Container>
            </Segment>)
    }
}
function mapStateToProps(state){
    return {
        users: state.AdminReducer.userProfile
    };

}
export default withRouter(connect(mapStateToProps)(FooterComponent));
