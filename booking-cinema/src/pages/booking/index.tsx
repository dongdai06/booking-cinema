import { Col, Flex, Typography } from "antd";
import "./index.less";
import { dataFake } from "../../data";
import { BookingChairType } from "../../constants";

function BookingPage() {
  const handleClassType = (type: string) => {
    switch (type) {
      case BookingChairType.ENTRYWAY:
        return "container-item container-item-entryway";
      case BookingChairType.EMPTY:
        return "container-item container-item-empty";
      default:
        return "container-item";
    }
  };

  return (
    <>
      <Flex justify="center" align="center">
        <Col xxl={24}>
          <Col>
            <Typography>Bước 1: Chọn ghế</Typography>
          </Col>
          <Typography>Màn hình</Typography>
          <Col className="container-screen" />
          <Flex wrap="wrap" gap={10}>
            {dataFake.map((item) => (
              <Col key={item.id} className={handleClassType(item.type)}>
                <Typography className="container-item-text">
                  {item.type === BookingChairType.ENTRYWAY ? "V" : item.name}
                </Typography>
              </Col>
            ))}
          </Flex>
        </Col>
      </Flex>

      <Col>
        <Typography>Ghế thường</Typography>
      </Col>
    </>
  );
}

export default BookingPage;
