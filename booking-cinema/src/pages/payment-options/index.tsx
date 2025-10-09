import { Checkbox, Col, Flex, Input, Typography } from "antd";
import "./index.less";
import QRWithCountdown from "../../components/QRCode";
import { useCountdown } from "../../hook/useCountdown";
import { formatCurrencyVND } from "../../utlis";
import { dataPayment } from "../../data/data";
import { useEffect, useState } from "react";
import { PaymentOptions } from "../../constants";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

function PaymentOptionsPage() {
  const navigate = useNavigate();
  const { remaining, formatted } = useCountdown(1 * 60);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleCheckedPaymentOptions = (option: string) => {
    setSelectedOption((prev) => (prev === option ? null : option));
  };

  useEffect(() => {
    if(remaining === 0){
      navigate(ROUTES.BOOKING_COMPLETE);
    }
  }, [remaining])

  return (
    <Flex justify="space-between" className="container-payment">
      <Col className="container-payment-left" xxl={8}>
        <Typography className="container-payment-left-title">
          Phương thức thanh toán
        </Typography>
        <Col
          className={
            selectedOption === PaymentOptions.QR_CODE
              ? "container-payment-left-options"
              : "container-payment-left-options-margin"
          }
        >
          <Checkbox
            checked={selectedOption === PaymentOptions.QR_CODE}
            onChange={() => handleCheckedPaymentOptions(PaymentOptions.QR_CODE)}
          >
            Thẻ tín dụng / Ghi nợ
          </Checkbox>
          {selectedOption === PaymentOptions.QR_CODE && (
            <Col className="container-payment-left-options-information">
              <Typography className="container-payment-left-options-information-title">
                Quét mã QR
              </Typography>
              <Col className="container-payment-left-options-information-drive" />
              <Typography className="container-payment-left-options-information-text">
                Vui lòng đăng nhập ứng dụng đã thêm thẻ UnionPay để quét mã QR
                và tiếp tục giao dịch
              </Typography>
              <QRWithCountdown value={dataPayment.orderCode} />
            </Col>
          )}
        </Col>
        <Col
          className={
            selectedOption === PaymentOptions.ATM
              ? "container-payment-left-options"
              : "container-payment-left-options-margin"
          }
        >
          <Checkbox
            checked={selectedOption === PaymentOptions.ATM}
            onChange={() => handleCheckedPaymentOptions(PaymentOptions.ATM)}
          >
            Thẻ ATM / Tài khoản ngân hàng
          </Checkbox>
          {selectedOption === PaymentOptions.ATM && (
            <Col className="container-payment-left-options-search">
              <Input
                placeholder="Tìm kiếm ngân hàng"
                className="container-payment-left-options-search-input"
              />
            </Col>
          )}
        </Col>
      </Col>
      <Col xxl={5} className="container-payment-right">
        <Flex
          justify="space-between"
          align="center"
          className="container-payment-right-top"
        >
          <Typography className="container-payment-left-title">
            Thông tin đơn hàng
          </Typography>
          <Typography className="container-payment-right-top-time">
            {remaining > 0 ? formatted : "Hết hạn"}
          </Typography>
        </Flex>
        <Col className="container-payment-right-information">
          <Flex justify="space-between" align="center">
            <Typography>Đơn vị chấp nhận thanh toán:</Typography>
            <Typography className="container-payment-right-information-span">
              {dataPayment?.unit}
            </Typography>
          </Flex>
          <Flex justify="space-between" align="center">
            <Typography className="container-payment-right-information-margin">
              Mã đơn hàng:
            </Typography>
            <Typography className="container-payment-right-information-span">
              {dataPayment?.orderCode}
            </Typography>
          </Flex>

          <Col className="container-payment-right-information-drive" />
          <Col>
            <Flex justify="space-between">
              <Typography>Số tiền thanh toán</Typography>
              <Typography className="container-payment-right-information-span">
                {formatCurrencyVND(dataPayment?.totalPrice)}
              </Typography>
            </Flex>
          </Col>
        </Col>
      </Col>
    </Flex>
  );
}

export default PaymentOptionsPage;
