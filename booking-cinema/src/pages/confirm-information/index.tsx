import { Button, Col, Flex, Typography } from "antd";
import { formatCurrencyVND } from "../../utlis";
import { useEffect, useState } from "react";
import { notificationError } from "../../components/notification/notification-provider";
import { dataInformation } from "../../data/data";

function ConfirmInformationPage() {
  const totalPrice = dataInformation?.informationChair.reduce(
    (sum, chair) => sum + chair.price,
    0
  );

  const [timeLeft, setTimeLeft] = useState(1 * 60); // 5 phút = 300 giây

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          notificationError({
            message: "Đã hết giờ",
          });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // format thành mm:ss
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <Flex justify="center" align="center">
      <Col xxl={24} className="container-choose-corn">
        <Col>
          <Typography className="container-choose-corn-text">
            Bước 3: Xác nhận thông tin
          </Typography>
          <Typography>
            {" "}
            {`${minutes.toString().padStart(2, "0")}:${seconds
              .toString()
              .padStart(2, "0")}`}
          </Typography>
        </Col>
        <Col>
          <Col>
            <Typography>Người nhận: {dataInformation.name}</Typography>
          </Col>
          <Col>
            <Typography>Email: {dataInformation.email}</Typography>
          </Col>
          <Col>
            <Typography>
              Số điện thoại: {dataInformation.phoneNumber}
            </Typography>
          </Col>
          <Col>
            <Typography>Rạp: {dataInformation.rap}</Typography>
          </Col>
          <Col>
            <Typography>Tên phim: {dataInformation.nameMovie}</Typography>
          </Col>
          <Col>
            <Typography>Suất chiếu: {dataInformation.showTime}</Typography>
          </Col>
          <Col>
            <Typography>
              Số ghế: {dataInformation.informationChair.length}
            </Typography>

            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {dataInformation.informationChair.map((item) => (
                <li
                  key={item.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: 6,
                  }}
                >
                  <span>{item.name}</span>
                  <span>{formatCurrencyVND(item.price)}</span>
                </li>
              ))}
            </ul>
          </Col>
          <Col>
            <Typography>Tổng tiền: {formatCurrencyVND(totalPrice)}</Typography>
          </Col>
          <Button className="container-note-button" style={{ marginTop: 8 }}>
            Tiếp theo
          </Button>
        </Col>
      </Col>
    </Flex>
  );
}

export default ConfirmInformationPage;
