
import { Container, Row, Col } from 'react-grid-system';
import { cpus } from 'os';
 


export default function(props) {

    if (props.userInfo)
    return (
        <Container style={{
                backgroundColor: "#216",
                margin: 0, padding:0, width: "100vw"
        }}>
            <Row justify="start">
                <Col sm={6} md={4} lg={4} style={{
                    backgroundColor: "#f00"
                }}>
                    <img src="/assets/logo.png" alt="MakerBounty" style={{ width: "100%" }} />        
                </Col>
            </Row>
        </Container>
    );

}