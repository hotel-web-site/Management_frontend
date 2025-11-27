import { Link } from "react-router-dom";
import StatusBadge from "../../common/StatusBadge";

const AdminRecentTable = ({ bookings = [], users = [], reviews = [] }) => {
  const renderEmptyRow = (colSpan, message) => (
    <tr>
      <td colSpan={colSpan} className="empty-cell">
        {message}
      </td>
    </tr>
  );

  return (
    <div className="card">
      <h3>최근 활동</h3>

      <div className="recent-section">
        <h4>최근 예약</h4>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>예약번호</th>
                <th>호텔명</th>
                <th>고객명</th>
                <th>상태</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length
                ? bookings.slice(0, 5).map((booking) => (
                    <tr key={booking.id}>
                      <td>
                        <Link to={`/admin/bookings/${booking.id}`}>
                          {booking.code || booking.id}
                        </Link>
                      </td>
                      <td>{booking.hotelName || "-"}</td>
                      <td>{booking.guestName || booking.customerName || "-"}</td>
                      <td>
                        <StatusBadge status={booking.status} type="booking" />
                      </td>
                    </tr>
                  ))
                : renderEmptyRow(4, "최근 예약이 없습니다.")}
            </tbody>
          </table>
        </div>
      </div>

      <div className="recent-section">
        <h4>신규 회원</h4>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>회원명</th>
                <th>이메일</th>
                <th>가입일</th>
                <th>상태</th>
              </tr>
            </thead>
            <tbody>
              {users.length
                ? users.slice(0, 5).map((user) => (
                    <tr key={user.id}>
                      <td>
                        <Link to={`/admin/users/${user.id}`}>
                          {user.name || "-"}
                        </Link>
                      </td>
                      <td>{user.email || "-"}</td>
                      <td>{user.createdAt || user.joinDate || "-"}</td>
                      <td>
                        <StatusBadge status={user.status} type="user" />
                      </td>
                    </tr>
                  ))
                : renderEmptyRow(4, "신규 가입 회원이 없습니다.")}
            </tbody>
          </table>
        </div>
      </div>

      <div className="recent-section">
        <h4>최신 리뷰</h4>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>호텔명</th>
                <th>고객명</th>
                <th>평점</th>
                <th>상태</th>
              </tr>
            </thead>
            <tbody>
              {reviews.length
                ? reviews.slice(0, 5).map((review) => (
                    <tr key={review.id}>
                      <td>{review.hotelName || "-"}</td>
                      <td>{review.guestName || review.author || "-"}</td>
                      <td>{review.rating ?? "-"}</td>
                      <td>
                        <StatusBadge status={review.status} type="review" />
                      </td>
                    </tr>
                  ))
                : renderEmptyRow(4, "신규 리뷰가 없습니다.")}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminRecentTable;
