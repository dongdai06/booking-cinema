import { Button, Col, Flex, Typography } from "antd";
import "./index.less";
import { useState } from "react";
import { formatCurrencyVND } from "../../utlis";
import type { ListDataCorns } from "../../interface";
import { dataCorn } from "../../data/data";

function ChooseCornPage() {
  const [data, setData] = useState<ListDataCorns[]>(dataCorn);

  const handleIncrease = (itemValue: number) => {
    setData((prevCart) =>
      prevCart.map((item) =>
        item.id === itemValue ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrease = (itemValue: number) => {
    setData((prevCart) =>
      prevCart.map((item) =>
        item.id === itemValue && item.quantity > 0
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const totalPrice = data.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <Flex justify="center" align="center">
      <Col xxl={24} className="container-choose-corn">
        <Col>
          <Typography className="container-choose-corn-text">
            Bước 2: Chọn bắp nước
          </Typography>
        </Col>
        <Col xxl={24} className="container-choose-corn-box">
          <Flex wrap="wrap">
            {data.map((item: ListDataCorns) => (
              <Col xxl={24} className="container-choose-corn-box-item">
                <Flex>
                  <Col>
                    <img
                      src={item.image}
                      className="container-choose-corn-box-item-image"
                    />
                  </Col>
                  <Col
                    className="container-choose-corn-box-item-information"
                    xxl={18}
                  >
                    <Typography>{item.name}</Typography>
                    <Typography>{item.description}</Typography>
                    <Typography>{formatCurrencyVND(item.price)}</Typography>
                    <Col className="container-choose-corn-box-item-information-driver" />
                    <Flex align="center">
                      <Button
                        className="container-choose-corn-box-item-information-quantity"
                        onClick={() => handleDecrease(item.id)}
                      >
                        -
                      </Button>
                      <Typography className="container-choose-corn-box-item-information-quantity-text">
                        {item.quantity}
                      </Typography>
                      <Button
                        className="container-choose-corn-box-item-information-quantity"
                        onClick={() => handleIncrease(item.id)}
                      >
                        +
                      </Button>
                    </Flex>
                  </Col>
                </Flex>
              </Col>
            ))}
          </Flex>
        </Col>
        <Col className="container-choose-corn-information">
          <Col>
            <Flex wrap="wrap">
              {data.map((item) => (
                <Col xxl={24}>
                  {item.quantity > 0 && (
                    <Col>
                      <Typography>Bắp nước đã chọn: {item.name}</Typography>
                    </Col>
                  )}
                </Col>
              ))}
            </Flex>

            <Typography>Thành tiền: {formatCurrencyVND(totalPrice)}</Typography>
            <Button className="container-note-button">Tiếp theo</Button>
          </Col>
        </Col>
      </Col>
    </Flex>
  );
}

export default ChooseCornPage;
