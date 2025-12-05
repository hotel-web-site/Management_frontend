import { Link } from "react-router-dom";
import EmptyState from "../../common/EmptyState";
import StatusBadge from "../../common/StatusBadge";

// (USER_STATUS_OPTIONS는 냅둠)
const USER_STATUS_OPTIONS = [
  { value: true, label: "활성" }, // 백엔드는 boolean (true/false) 씀
  { value: false, label: "차단" },
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
            <th>상태 (차단)</th>
            {/* <th>액션</th>  <-- 상세/삭제 없으니까 일단 숨김 */}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}> {/* 🚨 [수정] key=_id */}
              <td>
                <div className="table-title">
                  <div className="title">{user?.name || "-"}</div>
                  {/* 🚨 [수정] level -> role */}
                  {user?.role && (
                    <div className="subtitle">{user.role.toUpperCase()}</div>
                  )}
                </div>
              </td>
              <td>{user?.email || "-"}</td>
              <td>{user?.phoneNumber || "-"}</td> {/* 🚨 [수정] phone -> phoneNumber */}
              <td>{user?.role || "-"}</td>
              <td>{formatDate(user?.createdAt)}</td>
              <td>
                <div className="status-control">
                  {/* StatusBadge는 isActive (bool) 받아서 처리하게 수정 필요할 수도 있음 */}
                  {/* <StatusBadge status={user?.isActive ? 'active' : 'inactive'} type="user" /> */}

                  {/* 🚨 [수정] 차단 토글 버튼 (심플하게) */}
                  <button
                    className={`btn ${user.isActive ? 'btn-danger' : 'btn-primary'}`}
                    onClick={() => onStatusChange?.(user._id, user.isActive)} // 🚨 _id 전달
                  >
                    {user.isActive ? '차단하기' : '차단해제'}
                  </button>
                </div>
              </td>
              {/* <td>
                <div className="table-actions">
                   상세보기랑 삭제는 기능 없어서 주석 처리
                </div>
              </td> 
              */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUserTable;