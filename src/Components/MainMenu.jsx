import React from 'react'
import { Form, Card, Button,Col } from 'react-bootstrap'
import '../Styles/mainMenu.css'

class MainMenu extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            
        };
    }

    render(){
        return(
            <div className="pt-5 pl-5 pr-5 backgroundMM">
                <div className="row">
                    <div className="col-4">
                        <Card className="shadow bg-white rounded">
                            <Card.Body className = "backgroundCard">
                                <h1 style={{textAlign: 'center', color:'red'}}>
                                    Re-seña
                                </h1>
                                <h2 style={{textAlign: 'center'}}>
                                    ApiKey
                                </h2>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }
}

export default MainMenu;