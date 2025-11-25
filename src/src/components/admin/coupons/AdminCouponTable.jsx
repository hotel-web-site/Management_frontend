import { Link } from "react-router-dom";
import EmptyState from "../../common/EmptyState";
import StatusBadge from "../../common/StatusBadge";

const formatDate = (value) => {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleDateString("ko-KR");
};

const formatCurrency = (value) => {
  if (value === undefined || value === null) return "-";
  return `${Number(value).toLocaleString()}원`;
};

const formatDiscount = (coupon) => {
  if (!coupon) return "-";
  if (coupon.type === "percent") {
    return `${coupon.discountValue || 0}%`;
  }
  return formatCurrency(coupon.discountValue);
};

const AdminCouponTable = ({ coupons = [], onDelete, onToggleStatus }) => {
  if (!coupons.length) {
    return (
      <EmptyState
        icon="🎟️"
        message="등록된 쿠폰이 없습니다. 새 쿠폰을 생성해보세요."
      />
    );
  }

  const renderActions = (coupon) => {
    return (
      <div className="table-actions">
        <Link
          to={`/admin/coupons/${coupon?.id || ""}/edit`}
          className="btn btn-outline"
        >
          수정
        </Link>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => onToggleStatus?.(coupon.id, coupon.status)}
        >
          {coupon?.status === "active" ? "중단" : "활성화"}
        </button>

        <button
          type="button"
          className="btn btn-danger"
          onClick={() => onDelete?.(coupon.id)}
        >
          삭제
        </button>
      </div>
    );
  };

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>쿠폰명</th>
            <th>코드</th>
            <th>유형</th>
            <th>할인값</th>
            <th>최소 주문금액</th>
            <th>사용 기간</th>
            <th>사용량</th>
            <th>상태</th>
            <th>액션</th>
          </tr>
        </thead>
        <tbody>
          {coupons.map((coupon) => (
            <tr key={coupon.id || coupon.code}>
              <td>
                <div className="table-title">
                  <div className="title">{coupon?.name || "-"}</div>
                  {coupon?.description && (
                    <div className="subtitle">{coupon.description}</div>
                  )}
                </div>
              </td>
              <td>{coupon?.code || "-"}</td>
              <td>{coupon?.type === "percent" ? "정율" : "정액"}</td>
              <td>{formatDiscount(coupon)}</td>
              <td>{formatCurrency(coupon?.minOrderAmount)}</td>
              <td>
                {formatDate(coupon?.startDate)} ~ {formatDate(coupon?.endDate)}
              </td>
              <td>
                {(coupon?.usageCount || 0).toLocaleString()}
                {coupon?.usageLimit
                  ? ` / ${coupon.usageLimit.toLocaleString()}`
                  : ""}
              </td>
              <td>
                <StatusBadge status={coupon?.status} type="coupon" />
              </td>
              <td>{renderActions(coupon)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminCouponTable;