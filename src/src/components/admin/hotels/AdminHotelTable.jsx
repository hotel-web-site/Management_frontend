import { Link } from "react-router-dom";
import EmptyState from "../../common/EmptyState";
import StatusBadge from "../../common/StatusBadge";

const formatDate = (value) => {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleDateString("ko-KR");
};

const formatCurrency = (value) => {
  if (value === undefined || value === null) return "-";
  return `${Number(value).toLocaleString()}원`;
};

const AdminHotelTable = ({ hotels = [], onApprove, onReject, onDelete }) => {
  if (!hotels.length) {
    return (
      <EmptyState
        icon="🏨"
        message="등록된 호텔이 없습니다. 새로운 호텔을 추가해보세요."
      />
    );
  }

  const renderActions = (hotel) => {
    const isPending = hotel?.approvalStatus === "pending";

    return (
      <div className="table-actions">
        <Link
          to={`/admin/hotels/${hotel?.id || ""}/edit`}
          className="btn btn-outline"
        >
          수정
        </Link>

        {isPending && (
          <>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => onApprove?.(hotel.id)}
            >
              승인
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => onReject?.(hotel.id)}
            >
              거부
            </button>
          </>
        )}

        <button
          type="button"
          className="btn btn-outline"
          onClick={() => onDelete?.(hotel.id)}
        >
          삭제
        </button>
      </div>
    );
  };

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>호텔명</th>
            <th>파트너</th>
            <th>지역</th>
            <th>객실 수</th>
            <th>평균가</th>
            <th>승인 상태</th>
            <th>운영 상태</th>
            <th>등록일</th>
            <th>액션</th>
          </tr>
        </thead>
        <tbody>
          {hotels.map((hotel) => (
            <tr key={hotel.id || hotel.code}>
              <td>
                <div className="table-title">
                  <div className="title">{hotel?.name || "-"}</div>
                  {hotel?.brand && (
                    <div className="subtitle">{hotel.brand}</div>
                  )}
                </div>
              </td>
              <td>{hotel?.partnerName || hotel?.ownerName || "-"}</td>
              <td>{hotel?.city || hotel?.region || "-"}</td>
              <td>{hotel?.roomCount ?? "-"}</td>
              <td>{formatCurrency(hotel?.averagePrice)}</td>
              <td>
                <StatusBadge status={hotel?.approvalStatus} type="hotel" />
              </td>
              <td>
                <StatusBadge status={hotel?.status} type="hotel" />
              </td>
              <td>{formatDate(hotel?.createdAt)}</td>
              <td>{renderActions(hotel)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminHotelTable;