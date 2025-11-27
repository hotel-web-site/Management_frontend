import { Link } from "react-router-dom";
import EmptyState from "../../common/EmptyState";
import StatusBadge from "../../common/StatusBadge";

const USER_STATUS_OPTIONS = [
  { value: "active", label: "활성" },
  { value: "inactive", label: "비활성" },
  { value: "suspended", label: "정지" },
];

const formatDate = (value) => {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleDateString("ko-KR");
};

const AdminUserTable = ({ users = [], onStatusChange, onDelete }) => {
  if (!users.length) {
    return <EmptyState icon="👤" message="회원 데이터가 없습니다." />;
  }

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>회원명</th>
            <th>이메일</th>
            <th>전화번호</th>
            <th>역할</th>
            <th>가입일</th>
            <th>상태</th>
            <th>액션</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id || user.email}>
              <td>
                <div className="table-title">
                  <div className="title">{user?.name || "-"}</div>
                  {user?.level && (
                    <div className="subtitle">{user.level.toUpperCase()}</div>
                  )}
                </div>
              </td>
              <td>{user?.email || "-"}</td>
              <td>{user?.phone || "-"}</td>
              <td>{user?.role || "-"}</td>
              <td>{formatDate(user?.createdAt)}</td>
              <td>
                <div className="status-control">
                  <StatusBadge status={user?.status} type="user" />
                  <select
                    className="status-select"
                    value={user?.status || ""}
                    onChange={(event) =>
                      onStatusChange?.(user.id, event.target.value)
                    }
                  >
                    {USER_STATUS_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </td>
              <td>
                <div className="table-actions">
                  <Link
                    to={`/admin/users/${user?.id || ""}`}
                    className="btn btn-outline"
                  >
                    상세보기
                  </Link>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => onDelete?.(user.id)}
                  >
                    삭제
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUserTable;
