const DEFAULT_FILTERS = {
  keyword: "",
  city: "",
  status: "",
  approvalStatus: "",
  sort: "latest",
};

const AdminHotelFilter = ({ filters = {}, onFilterChange, onSearch }) => {
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
        <label htmlFor="hotelKeyword">검색어</label>
        <input
          id="hotelKeyword"
          name="keyword"
          type="text"
          placeholder="호텔명, 파트너명 검색"
          value={appliedFilters.keyword}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </div>

      <div className="filter-group">
        <label htmlFor="hotelCity">지역</label>
        <input
          id="hotelCity"
          name="city"
          type="text"
          placeholder="예: 서울"
          value={appliedFilters.city}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </div>

      <div className="filter-group">
        <label htmlFor="hotelStatus">운영 상태</label>
        <select
          id="hotelStatus"
          name="status"
          value={appliedFilters.status}
          onChange={handleChange}
        >
          <option value="">전체</option>
          <option value="active">활성</option>
          <option value="inactive">비활성</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="hotelApproval">승인 상태</label>
        <select
          id="hotelApproval"
          name="approvalStatus"
          value={appliedFilters.approvalStatus}
          onChange={handleChange}
        >
          <option value="">전체</option>
          <option value="pending">승인대기</option>
          <option value="approved">승인</option>
          <option value="rejected">거부</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="hotelSort">정렬</label>
        <select
          id="hotelSort"
          name="sort"
          value={appliedFilters.sort}
          onChange={handleChange}
        >
          <option value="latest">최신 등록순</option>
          <option value="oldest">오래된순</option>
          <option value="popular">예약 많은순</option>
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

export default AdminHotelFilter;