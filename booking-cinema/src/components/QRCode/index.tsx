import React from "react";
import QRCode from "react-qr-code";
import "./index.less";
import { useCountdown } from "../../hook/useCountdown";

type Props = {
  value: string; // chuỗi sẽ mã hoá trong QR
  expirySeconds?: number; // thời gian đếm ngược (giây). default: 1600 (26:40)
  size?: number; // kích thước QR (px)
};

export const QRWithCountdown: React.FC<Props> = ({
  value,
  expirySeconds = 20 * 60,
  size = 150,
}) => {
  const { remaining, formatted } = useCountdown(expirySeconds);

  return (
    <div className="container-qr">
      <div className="container-qr-card">
        <div className="container-qr-card-box">
          <QRCode value={value} size={size - 24} level="M" />
        </div>
        <div className="container-qr-card-footer">
          <span className="container-qr-card-text">Còn</span>
          <span className="container-qr-card-time">
            {remaining > 0 ? formatted : "Hết hạn"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default QRWithCountdown;
