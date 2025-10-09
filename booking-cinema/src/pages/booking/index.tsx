import { Button, Col, Flex, Typography } from "antd";
import "./index.less";
import { BookingChairType } from "../../constants";
import { useState } from "react";
import type { ListDataChooseChair } from "../../interface";
import { dataFake, dataNoteColor } from "../../data/data";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { formatCurrencyVND } from "../../utlis";
import { notificationError } from "../../components/notification/notification-provider";
import {
  getLocalStorageItem,
  localStorageKeys,
} from "../../utlis/localStorageUtil";

function BookingPage() {
  const [dataNew, setDataNew] = useState<ListDataChooseChair[]>(dataFake);
  const [informationChairSelected, setInformationChairSelected] = useState<
    ListDataChooseChair[]
  >([]);
  const isLogin: boolean =
    getLocalStorageItem(localStorageKeys.IS_LOGIN) || false;

  const handleClassType = (item: ListDataChooseChair) => {
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

  const handleChairSelected = (item: ListDataChooseChair) => {
    // determine whether item (or item group for couple) is currently selected
    const isSelected = informationChairSelected.some((sel) =>
      item.type === BookingChairType.NORMAL
        ? sel.id === item.id
        : // for couple, we use seatType to identify the pair/group
        item.type === BookingChairType.COUPLE
        ? sel.seatType === item.seatType
        : false
    );

    // Update selected info: remove if currently selected, otherwise add.
    if (item.type === BookingChairType.COUPLE) {
      if (isSelected) {
        // remove all selected chairs that belong to this couple seatType
        setInformationChairSelected((prev) =>
          prev.filter((sel) => sel.seatType !== item.seatType)
        );
      } else {
        // add all chairs from current data that belong to this couple seatType
        const chairsToAdd = dataNew.filter(
          (c) =>
            c.seatType === item.seatType &&
            !informationChairSelected.some((s) => s.id === c.id)
        );
        setInformationChairSelected((prev) => [...prev, ...chairsToAdd]);
      }
    } else {
      // NORMAL seat: toggle single item in the selected list
      if (isSelected) {
        setInformationChairSelected((prev) =>
          prev.filter((sel) => sel.id !== item.id)
        );
      } else {
        setInformationChairSelected((prev) => [...prev, item]);
      }
    }

    // Update the main chair data: flip status for matching chairs.
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
  const navigate = useNavigate();
  const handleContinue = () => {
    if (selectedFromData.length === 0) {
      notificationError({
        message: "Vui lòng chọn ghế trước khi tiếp tục",
      });
      return;
    } else if (!isLogin) {
      notificationError({
        message: "Vui lòng chọn đăng nhập trước khi tiếp tục",
      });
      return;
    }
    navigate(ROUTES.CHOOSE_CORN);
  };

  // helper to produce a human-readable label for a chair
  const getChairLabel = (ch: ListDataChooseChair) => {
    // prefer name if provided, otherwise fallback to id
    return ch.name ?? `Ghế ${ch.id}`;
  };

  // derive selected chairs from dataNew as single source of truth
  const selectedFromData = dataNew.filter((c) => c.status);

  // group selected chairs by seatType for couple seats, otherwise by id
  const groupedSelected = selectedFromData.reduce<
    Record<string, ListDataChooseChair[]>
  >((acc, ch) => {
    const key =
      ch.type === BookingChairType.COUPLE && ch.seatType
        ? ch.seatType
        : ch.id.toString();
    (acc[key] ||= []).push(ch);
    return acc;
  }, {});

  // use shared currency formatter from utils

  // fallback prices when data doesn't include price for some seats
  const DEFAULT_SEAT_PRICE = 60000; // per-seat fallback
  const DEFAULT_COUPLE_PRICE = 120000; // per-couple fallback

  const groupPrice = (chairs: ListDataChooseChair[]) => {
    const sum = chairs.reduce((s, x) => s + (x.price ?? 0), 0);
    if (sum > 0) return sum;
    // if no price present on items, fallback based on group type
    if (chairs.length === 2 && chairs[0].type === BookingChairType.COUPLE)
      return DEFAULT_COUPLE_PRICE;
    // single seat fallback
    return chairs[0].price ?? DEFAULT_SEAT_PRICE;
  };

  const totalPrice = Object.values(groupedSelected).reduce(
    (s, chairs) => s + groupPrice(chairs),
    0
  );

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
            <div className="selected-chairs-list" style={{ marginTop: 12 }}>
              <Typography className="container-note-color-title">
                {selectedFromData.length > 0
                  ? "Danh sách ghế đã chọn"
                  : "Chưa chọn ghế"}
              </Typography>

              {selectedFromData.length > 0 && (
                <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                  {Object.entries(groupedSelected).map(([key, chairs]) => (
                    <li
                      key={key}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: 6,
                      }}
                    >
                      <span>
                        {chairs.map((c) => getChairLabel(c)).join(".")}
                      </span>
                      <span style={{ marginLeft: 12, fontWeight: 600 }}>
                        {formatCurrencyVND(groupPrice(chairs))}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <Typography style={{ marginTop: 12 }}>
              Gía vé: {formatCurrencyVND(totalPrice)}
            </Typography>
            <Button
              className="container-note-button"
              onClick={handleContinue}
              style={{ marginTop: 8 }}
            >
              Tiếp theo
            </Button>
          </Col>
        </Flex>
      </Col>
    </>
  );
}

export default BookingPage;
