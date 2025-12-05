import { useState, useEffect } from "react";
// import AdminUserFilter from ... (필터는 일단 둠)
import AdminUserTable from "../../components/admin/users/AdminUserTable";
import Pagination from "../../components/common/Pagination";
import adminUserApi from "../../api/adminUserApi"; // 🚨 중괄호 뺌
import Loader from "../../components/common/Loader";
import ErrorMessage from "../../components/common/ErrorMessage";

const AdminUserListPage = () => {
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await adminUserApi.getUsers({
        // ...filters,
        page: currentPage,
      });
      // 🚨 백엔드 응답 구조: { users: [...], total, ... }
      setUsers(data.users || []);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      setError(err.message || "데이터를 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (userId, currentStatus) => {
    if (!window.confirm(`정말 ${currentStatus ? '차단' : '해제'} 하시겠습니까?`)) return;

    try {
      // 🚨 백엔드는 토글이라 status 값 안 보내도 됨 (userId만 보냄)
      await adminUserApi.updateUserStatus(userId);
      alert("상태가 변경되었습니다.");
      fetchUsers();
    } catch (err) {
      alert(err.message || "상태 변경에 실패했습니다.");
    }
  };

  // handleDelete 삭제 (기능 없음)

  if (loading) return <Loader fullScreen />;
  if (error) return <ErrorMessage message={error} onRetry={fetchUsers} />;

  return (
    <div className="admin-user-list-page">
      <div className="page-header">
        <h1>회원 관리 (관리자)</h1>
      </div>

      {/* 필터는 필요하면 연결 */}
      {/* <AdminUserFilter ... /> */}

      <AdminUserTable
        users={users}
        onStatusChange={handleStatusChange}
      // onDelete={handleDelete} // 삭제
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default AdminUserListPage;