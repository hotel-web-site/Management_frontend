const DEFAULT_FILTERS = {
  keyword: "",
  rating: "",
  status: "",
  reportStatus: "",
  dateFrom: "",
  dateTo: "",
  sort: "latest",
};

const AdminReviewFilter = ({ filters = {}, onFilterChange, onSearch }) => {
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
        <label htmlFor="reviewKeyword">검색어</label>
        <input
          id="reviewKeyword"
          name="keyword"
          type="text"
          placeholder="리뷰 내용, 회원명, 호텔명 검색"
          value={appliedFilters.keyword}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </div>

      <div className="filter-group">
        <label htmlFor="reviewRating">평점</label>
        <select
          id="reviewRating"
          name="rating"
          value={appliedFilters.rating}
          onChange={handleChange}
        >
          <option value="">전체</option>
          {[5, 4, 3, 2, 1].map((value) => (
            <option key={value} value={value}>
              {value}점 이상
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="reviewStatus">상태</label>
        <select
          id="reviewStatus"
          name="status"
          value={appliedFilters.status}
          onChange={handleChange}
        >
          <option value="">전체</option>
          <option value="published">노출</option>
          <option value="hidden">숨김</option>
          <option value="reported">신고됨</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="reportStatus">신고 여부</label>
        <select
          id="reportStatus"
          name="reportStatus"
          value={appliedFilters.reportStatus}
          onChange={handleChange}
        >
          <option value="">전체</option>
          <option value="reported">신고 있음</option>
          <option value="resolved">처리 완료</option>
          <option value="clean">신고 없음</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="reviewDateFrom">작성일 시작</label>
        <input
          id="reviewDateFrom"
          name="dateFrom"
          type="date"
          value={appliedFilters.dateFrom}
          onChange={handleChange}
        />
      </div>

      <div className="filter-group">
        <label htmlFor="reviewDateTo">작성일 종료</label>
        <input
          id="reviewDateTo"
          name="dateTo"
          type="date"
          value={appliedFilters.dateTo}
          onChange={handleChange}
        />
      </div>

      <div className="filter-group">
        <label htmlFor="reviewSort">정렬</label>
        <select
          id="reviewSort"
          name="sort"
          value={appliedFilters.sort}
          onChange={handleChange}
        >
          <option value="latest">최신순</option>
          <option value="oldest">오래된순</option>
          <option value="highest">평점 높은순</option>
          <option value="lowest">평점 낮은순</option>
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

export default AdminReviewFilter;