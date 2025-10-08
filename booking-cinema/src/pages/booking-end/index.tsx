import { Card, Table, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import "./index.less";
import type { BookingInfo } from "../../interface";
import { dataCompleteBooking } from "../../data/data";

const { Title, Text } = Typography;
const columns: ColumnsType<BookingInfo> = [
  {
    title: "",
    dataIndex: "label",
    key: "label",
    width: "20%",
    render: (text) => <Text strong>{text}</Text>,
  },
  {
    title: "",
    dataIndex: "value",
    key: "value",
    render: (text) => <Text>{text !== "" ? text : "NA"}</Text>,
  },
];

const BookingEndPage = () => {
  return (
    <Card className="booking-info-card">
      <Title level={4} className="booking-info-card-title">
        Thông tin đặt vé
      </Title>
      <Table
        columns={columns}
        dataSource={dataCompleteBooking}
        pagination={false}
        bordered
        showHeader={false}
        className="booking-info-card-table"
      />
    </Card>
  );
};

export default BookingEndPage;
