import { Button, Col, Flex, Typography } from "antd";
import "./index.less";
import { dataFake, dataNoteColor } from "../../data";
import { BookingChairType } from "../../constants";
import { useState } from "react";

function BookingPage() {
  const [dataNew, setDataNew] = useState(dataFake);
  const [informationChairSelected, setInformationChairSelected] = useState<
    any[]
  >([]);
  console.log("informationChairSelected", informationChairSelected);

  const handleClassType = (item: any) => {
    switch (item.type) {
      case BookingChairType.ENTRYWAY:
        return "container-item container-item-entryway";
      case BookingChairType.EMPTY:
        return "container-item container-item-empty";
      case BookingChairType.COUPLE:
        return !item.status
          ? "container-item container-item-couple"
          : "container-item container-item-selected";
      default:
        return item.status
          ? "container-item container-item-selected"
          : "container-item";
    }
  };

  const handleClassName = (type: string) => {
    switch (type) {
      case BookingChairType.NORMAL:
        return "container-note-color-item-normal";
      case BookingChairType.VIP:
        return "container-note-color-item-vip";
      case BookingChairType.CHAIR_SOLD:
        return "container-note-color-item-chairSold";
      case BookingChairType.COUPLE:
        return "container-note-color-item-couple";
      case BookingChairType.LUXURY:
        return "container-note-color-item-luxury";
      case BookingChairType.ENTRYWAY:
        return "container-note-color-item-entryway";
      case BookingChairType.CHAIR_SELECTED:
        return "container-note-color-item-chairSelected";
      default:
        return "container-note-color-item-normal";
    }
  };

  const handleName = (type: string) => {
    switch (type) {
      case BookingChairType.NORMAL:
        return "Ghế thường";
      case BookingChairType.VIP:
        return "Ghế VIP";
      case BookingChairType.CHAIR_SOLD:
        return "Ghế đã bán";
      case BookingChairType.COUPLE:
        return "Ghế đôi";
      case BookingChairType.LUXURY:
        return "Ghế luxury";
      case BookingChairType.ENTRYWAY:
        return "Lỗi đi";
      case BookingChairType.CHAIR_SELECTED:
        return "Ghế đang chọn";
      default:
        return "Ghế thường";
    }
  };

  const handleChairSelected = (item: any) => {
    setInformationChairSelected((prev) => [...prev, item]);

    setDataNew((prev) =>
      prev.map((chair) => {
        const isNormal =
          item.type === BookingChairType.NORMAL && chair.id === item.id;
        const isCouple =
          item.type === BookingChairType.COUPLE &&
          chair.seatType === item.seatType;

        return isNormal || isCouple
          ? { ...chair, status: !chair.status }
          : chair;
      })
    );
  };

  return (
    <>
      <Flex justify="center" align="center">
        <Col xxl={24} className="container-booking-chair">
          <Col>
            <Typography>Bước 1: Chọn ghế</Typography>
          </Col>
          <Typography>Màn hình</Typography>
          <Col className="container-screen" />
          <Flex wrap="wrap" gap={10}>
            {dataNew.map((item) => (
              <Col
                key={item.id}
                className={handleClassType(item)}
                onClick={() => handleChairSelected(item)}
              >
                <Typography
                  className={
                    item.status
                      ? "container-item-text-selected"
                      : "container-item-text"
                  }
                >
                  {item.type === BookingChairType.ENTRYWAY ? "V" : item.name}
                </Typography>
              </Col>
            ))}
          </Flex>
        </Col>
      </Flex>

      <Col className="container-note-color">
        <Flex>
          <Col xxl={12}>
            <Typography className="container-note-color-title">
              Chú thích màu sắc
            </Typography>
            <Flex wrap="wrap" gap={10} justify="space-between">
              {dataNoteColor.map((item) => (
                <Col xxl={10}>
                  <Flex wrap="wrap" gap={10}>
                    <Col
                      className={`container-note-color-item ${handleClassName(
                        item.type
                      )}`}
                    >
                      <Typography className="container-note-color-item-text">
                        {item.type === "entryway" && "V"}
                      </Typography>
                    </Col>
                    <Typography>{handleName(item.type)}</Typography>
                  </Flex>
                </Col>
              ))}
            </Flex>
          </Col>
          <Col xxl={12}>
            <Typography className="container-note-color-title">
              {informationChairSelected && informationChairSelected?.length > 0
                ? "Danh sách ghế đã chọn"
                : "Chưa chọn ghế"}
            </Typography>
            <Typography>Gía vé: 0</Typography>
            <Button className="container-note-button">Tiếp theo</Button>
          </Col>
        </Flex>
      </Col>
    </>
  );
}

export default BookingPage;
