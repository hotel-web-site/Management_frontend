import EmptyState from "../../common/EmptyState";
import StatusBadge from "../../common/StatusBadge";

const formatDate = (value) => {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleDateString("ko-KR");
};

const AdminUserDetail = ({ user }) => {
  if (!user) {
    return (
      <EmptyState
        icon="👤"
        message="회원 정보를 불러오지 못했습니다. 목록으로 돌아가 다시 시도해주세요."
      />
    );
  }

  return (
    <div className="user-detail">
      <div className="card detail-section">
        <h3>기본 정보</h3>
        <div className="detail-row">
          <div className="label">이름</div>
          <div className="value">{user?.name || "-"}</div>
        </div>
        <div className="detail-row">
          <div className="label">이메일</div>
          <div className="value">{user?.email || "-"}</div>
        </div>
        <div className="detail-row">
          <div className="label">전화번호</div>
          <div className="value">{user?.phone || "-"}</div>
        </div>
        <div className="detail-row">
          <div className="label">상태</div>
          <div className="value">
            <StatusBadge status={user?.status} type="user" />
          </div>
        </div>
        <div className="detail-row">
          <div className="label">가입일</div>
          <div className="value">{formatDate(user?.createdAt)}</div>
        </div>
      </div>

      <div className="card detail-section">
        <h3>역할 및 등급</h3>
        <div className="detail-row">
          <div className="label">역할</div>
          <div className="value">{user?.role || "-"}</div>
        </div>
        <div className="detail-row">
          <div className="label">회원 타입</div>
          <div className="value">{user?.type || "-"}</div>
        </div>
        <div className="detail-row">
          <div className="label">등급</div>
          <div className="value">{user?.level?.toUpperCase() || "-"}</div>
        </div>
      </div>

      {user?.memo && (
        <div className="card detail-section">
          <h3>관리자 메모</h3>
          <div className="detail-row">
            <div className="label">내용</div>
            <div className="value">{user.memo}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUserDetail;

