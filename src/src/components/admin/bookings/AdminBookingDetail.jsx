import EmptyState from "../../common/EmptyState";
import StatusBadge from "../../common/StatusBadge";

const formatDate = (value) => {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleString("ko-KR");
};

const formatCurrency = (value) => {
  if (value === undefined || value === null) return "-";
  return `${Number(value).toLocaleString()}원`;
};

const AdminBookingDetail = ({ booking }) => {
  if (!booking) {
    return (
      <EmptyState
        icon="📘"
        message="예약 정보를 찾을 수 없습니다. 목록으로 돌아가 다시 확인해주세요."
      />
    );
  }

  return (
    <div className="booking-detail">
      <div className="card detail-section">
        <h3>예약 정보</h3>
        <div className="detail-row">
          <div className="label">예약번호</div>
          <div className="value">{booking?.code || booking?.id || "-"}</div>
        </div>
        <div className="detail-row">
          <div className="label">호텔</div>
          <div className="value">{booking?.hotelName || "-"}</div>
        </div>
        <div className="detail-row">
          <div className="label">객실 유형</div>
          <div className="value">{booking?.roomType || "-"}</div>
        </div>
        <div className="detail-row">
          <div className="label">체크인/체크아웃</div>
          <div className="value">
            {formatDate(booking?.checkIn)} ~ {formatDate(booking?.checkOut)}
          </div>
        </div>
        <div className="detail-row">
          <div className="label">금액</div>
          <div className="value">{formatCurrency(booking?.totalAmount)}</div>
        </div>
      </div>

      <div className="card detail-section">
        <h3>상태</h3>
        <div className="detail-row">
          <div className="label">예약 상태</div>
          <div className="value">
            <StatusBadge status={booking?.status} type="booking" />
          </div>
        </div>
        <div className="detail-row">
          <div className="label">결제 상태</div>
          <div className="value">
            <StatusBadge status={booking?.paymentStatus} type="booking" />
          </div>
        </div>
        {booking?.paymentMethod && (
          <div className="detail-row">
            <div className="label">결제 수단</div>
            <div className="value">{booking.paymentMethod}</div>
          </div>
        )}
        {booking?.createdAt && (
          <div className="detail-row">
            <div className="label">예약일</div>
            <div className="value">{formatDate(booking.createdAt)}</div>
          </div>
        )}
      </div>

      <div className="card detail-section">
        <h3>고객 정보</h3>
        <div className="detail-row">
          <div className="label">고객명</div>
          <div className="value">{booking?.guestName || "-"}</div>
        </div>
        <div className="detail-row">
          <div className="label">이메일</div>
          <div className="value">{booking?.guestEmail || "-"}</div>
        </div>
        {booking?.guestPhone && (
          <div className="detail-row">
            <div className="label">연락처</div>
            <div className="value">{booking.guestPhone}</div>
          </div>
        )}
        {booking?.request && (
          <div className="detail-row">
            <div className="label">요청사항</div>
            <div className="value">{booking.request}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminBookingDetail;