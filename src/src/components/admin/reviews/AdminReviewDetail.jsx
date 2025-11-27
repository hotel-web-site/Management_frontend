import EmptyState from "../../common/EmptyState";
import StatusBadge from "../../common/StatusBadge";

const formatDate = (value) => {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleString("ko-KR");
};

const renderRating = (rating) => {
  if (!rating) return "-";
  const stars = Math.round(rating);
  return (
    <span className="rating">
      {"★".repeat(stars)}
      {"☆".repeat(5 - stars)}
      <span className="rating-score">({Number(rating).toFixed(1)})</span>
    </span>
  );
};

const AdminReviewDetail = ({ review }) => {
  if (!review) {
    return (
      <EmptyState
        icon="💬"
        message="리뷰 정보를 찾을 수 없습니다. 목록으로 돌아가 확인해주세요."
      />
    );
  }

  return (
    <div className="review-detail">
      <div className="card detail-section">
        <div className="detail-row">
          <div className="label">호텔</div>
          <div className="value">{review?.hotelName || "-"}</div>
        </div>
        <div className="detail-row">
          <div className="label">평점</div>
          <div className="value">{renderRating(review?.rating)}</div>
        </div>
        <div className="detail-row">
          <div className="label">상태</div>
          <div className="value">
            <StatusBadge status={review?.status} type="review" />
          </div>
        </div>
        <div className="detail-row">
          <div className="label">신고 현황</div>
          <div className="value">
            {review?.reportCount
              ? `${review.reportCount}건 / ${review.reportStatus || "-"}`
              : "신고 없음"}
          </div>
        </div>
        <div className="detail-row">
          <div className="label">작성일</div>
          <div className="value">{formatDate(review?.createdAt)}</div>
        </div>
      </div>

      <div className="card detail-section">
        <h3>고객 정보</h3>
        <div className="detail-row">
          <div className="label">고객명</div>
          <div className="value">{review?.guestName || "-"}</div>
        </div>
        <div className="detail-row">
          <div className="label">이메일</div>
          <div className="value">{review?.guestEmail || "-"}</div>
        </div>
      </div>

      <div className="card detail-section">
        <h3>리뷰 내용</h3>
        {review?.title && (
          <div className="detail-row">
            <div className="label">제목</div>
            <div className="value">{review.title}</div>
          </div>
        )}
        <div className="detail-row">
          <div className="label">내용</div>
          <div className="value">{review?.content || "-"}</div>
        </div>
      </div>
    </div>
  );
};

export default AdminReviewDetail;