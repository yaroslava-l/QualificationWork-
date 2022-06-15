import React from 'react';
import {Col, Container, Row} from "react-bootstrap";
import TypeBar from "../components/goods/TypeBar";
import GoodsList from "../components/goods/GoodsList";
import {observer} from "mobx-react-lite";
import CostBar from "../components/goods/costBar";

const Goods = observer(() => {
    return (
        <Container>
            <Row className="mt-2">

                <Col md={3}>
                    <div className="d-flex justify-content-center mt-2">
                       Категорії
                    </div>
                    <TypeBar />
                    <div className="d-flex justify-content-center mt-2">
                        По ціні
                    </div>
                    <CostBar />
                </Col>
                <Col md={9}>
                    <GoodsList/>
                </Col>
            </Row>
        </Container>
    );
});

export default Goods;