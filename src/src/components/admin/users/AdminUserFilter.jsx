const DEFAULT_FILTERS = {
  keyword: "",
  status: "",
  role: "",
  level: "",
};

const AdminUserFilter = ({ filters = {}, onFilterChange, onSearch }) => {
  const appliedFilters = { ...DEFAULT_FILTERS, ...filters };

  const handleChange = (event) => {
    const { name, value } = event.target;
    onFilterChange?.({ [name]: value });
  };

  const handleReset = () => {
    onFilterChange?.({ ...DEFAULT_FILTERS });
    onSearch?.();
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      onSearch?.();
    }
  };

  return (
    <div className="filter-bar">
      <div className="filter-group">
        <label htmlFor="userKeyword">검색어</label>
        <input
          id="userKeyword"
          name="keyword"
          type="text"
          placeholder="이름, 이메일, 전화번호 검색"
          value={appliedFilters.keyword}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </div>

      <div className="filter-group">
        <label htmlFor="userStatus">상태</label>
        <select
          id="userStatus"
          name="status"
          value={appliedFilters.status}
          onChange={handleChange}
        >
          <option value="">전체</option>
          <option value="active">활성</option>
          <option value="inactive">비활성</option>
          <option value="suspended">정지</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="userRole">유형</label>
        <select
          id="userRole"
          name="role"
          value={appliedFilters.role}
          onChange={handleChange}
        >
          <option value="">전체</option>
          <option value="user">일반회원</option>
          <option value="host">호스트</option>
          <option value="admin">관리자</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="userLevel">등급</label>
        <select
          id="userLevel"
          name="level"
          value={appliedFilters.level}
          onChange={handleChange}
        >
          <option value="">전체</option>
          <option value="vip">VIP</option>
          <option value="gold">Gold</option>
          <option value="silver">Silver</option>
          <option value="bronze">Bronze</option>
        </select>
      </div>

      <div className="filter-group">
        <button type="button" className="btn btn-primary" onClick={onSearch}>
          검색
        </button>
        <button type="button" className="btn btn-outline" onClick={handleReset}>
          초기화
        </button>
      </div>
    </div>
  );
};

export default AdminUserFilter;
