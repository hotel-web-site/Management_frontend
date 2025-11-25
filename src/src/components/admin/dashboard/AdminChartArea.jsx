const CHART_WIDTH = 600;
const CHART_HEIGHT = 220;
const CHART_PADDING = 24;

const AdminChartArea = ({ data }) => {
  const labels = data?.labels || [];
  const revenue = data?.revenue || [];
  const bookings = data?.bookings || [];
  const hasData = labels.length && revenue.length;

  const buildPolyline = (values) => {
    if (!values.length) return "";
    const maxValue = Math.max(...values);
    if (!maxValue) return "";

    return values
      .map((value, index) => {
        const x =
          (index / Math.max(values.length - 1, 1)) *
            (CHART_WIDTH - CHART_PADDING * 2) +
          CHART_PADDING;
        const y =
          CHART_HEIGHT -
          CHART_PADDING -
          (value / maxValue) * (CHART_HEIGHT - CHART_PADDING * 2);
        return `${x},${y}`;
      })
      .join(" ");
  };

  return (
    <div className="card chart-card">
      <div className="chart-header">
        <h3>매출 추이</h3>
        <div className="chart-legend">
          <span className="legend revenue">매출</span>
          <span className="legend bookings">예약 건수</span>
        </div>
      </div>

      {hasData ? (
        <svg
          className="line-chart"
          viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
          role="img"
          aria-label="최근 매출 및 예약 추이"
        >
          <polyline
            points={buildPolyline(bookings)}
            fill="none"
            stroke="#0ea5e9"
            strokeWidth="3"
            strokeLinejoin="round"
            strokeLinecap="round"
            opacity="0.8"
          />
          <polyline
            points={buildPolyline(revenue)}
            fill="none"
            stroke="#2563eb"
            strokeWidth="4"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
      ) : (
        <div className="chart-placeholder">
          <p>표시할 데이터가 없습니다. 기간을 변경해 보세요.</p>
        </div>
      )}

      {hasData && (
        <div className="chart-axis">
          {labels.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminChartArea;
