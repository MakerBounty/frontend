
import { Container, Row, Col, Visible } from "react-grid-system";


interface PostSummary {
    title: string;
    tags: [string];
    specBody: string;
    opUserId: Number;
    views: Number;
    ts: Number;
    score: Number;
    watching: [Number];
    comments: [any];
}

export default function OriginalPost({ postData } : { postData : PostSummary }) {
    return (<>
        <Container>
            <Row>
                <Col>
                    
                </Col>
                <Col>
                </Col>
            </Row>
        </Container>
    
    </>)
}