import React, { Component } from 'react'
import { Container,Form } from 'react-bootstrap'

export default class faq extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    componentDidMount(){

    }
    render() {
        return (
            <div>
                <Container classNAme="addFaq">
                    <Form>
                        Add Question to FAQ
                    </Form>
                </Container>
            </div>
        )
    }
}
