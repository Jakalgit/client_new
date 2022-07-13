import React, {useContext, useEffect, useState} from 'react';
import {Alert, Button, Container, Spinner} from "react-bootstrap";
import {CSSTransition} from "react-transition-group";
import "../css/components/Alert.css"

const FindPage = () => {

    const [showButton, setShowButton] = useState(true);
    const [showMessage, setShowMessage] = useState(false);
    return (
        <div className="message">
            <Container style={{ paddingTop: '2rem' }}>
                {showButton && (
                    <Button
                        onClick={() => setShowMessage(true)}
                        size="lg"
                    >
                        Show Message
                    </Button>
                )}
                <CSSTransition
                    in={showMessage}
                    timeout={300}
                    classNames="alert"
                    unmountOnExit
                    onEnter={() => setShowButton(false)}
                    onExited={() => setShowButton(true)}
                >
                    <Alert
                        variant="danger"
                        dismissible
                        onClose={() => setShowMessage(false)}
                    >
                        <Alert.Heading>
                            Animated alert message
                        </Alert.Heading>
                        <p>
                            This alert message is being transitioned in and
                            out of the DOM.
                        </p>
                        <Button onClick={() => setShowMessage(false)}>
                            Close
                        </Button>
                    </Alert>
                </CSSTransition>
            </Container>
        </div>
    );
};

export default FindPage;