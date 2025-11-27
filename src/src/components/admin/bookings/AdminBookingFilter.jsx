const DEFAULT_FILTERS = {
  keyword: "",
  status: "",
  paymentStatus: "",
  checkInFrom: "",
  checkInTo: "",
};

const AdminBookingFilter = ({ filters = {}, onFilterChange, onSearch }) => {
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
        <label htmlFor="bookingKeyword">검색어</label>
        <input
          id="bookingKeyword"
          name="keyword"
          type="text"
          placeholder="예약번호, 회원명, 호텔명 검색"
          value={appliedFilters.keyword}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </div>

      <div className="filter-group">
        <label htmlFor="bookingStatus">예약 상태</label>
        <select
          id="bookingStatus"
          name="status"
          value={appliedFilters.status}
          onChange={handleChange}
        >
          <option value="">전체</option>
          <option value="pending">대기</option>
          <option value="confirmed">확정</option>
          <option value="completed">완료</option>
          <option value="cancelled">취소</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="paymentStatus">결제 상태</label>
        <select
          id="paymentStatus"
          name="paymentStatus"
          value={appliedFilters.paymentStatus}
          onChange={handleChange}
        >
          <option value="">전체</option>
          <option value="paid">결제완료</option>
          <option value="pending">결제대기</option>
          <option value="refunded">환불완료</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="checkInFrom">체크인 시작</label>
        <input
          id="checkInFrom"
          name="checkInFrom"
          type="date"
          value={appliedFilters.checkInFrom}
          onChange={handleChange}
        />
      </div>

      <div className="filter-group">
        <label htmlFor="checkInTo">체크인 종료</label>
        <input
          id="checkInTo"
          name="checkInTo"
          type="date"
          value={appliedFilters.checkInTo}
          onChange={handleChange}
        />
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

export default AdminBookingFilter;

