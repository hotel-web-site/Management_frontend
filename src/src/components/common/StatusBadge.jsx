const StatusBadge = ({ status, type = "booking" }) => {
  const getStatusConfig = () => {
    if (type === "booking") {
      const statusMap = {
        pending: { label: "대기", className: "badge-warning" },
        confirmed: { label: "확정", className: "badge-success" },
        cancelled: { label: "취소", className: "badge-danger" },
        completed: { label: "완료", className: "badge-info" },
      };
      return (
        statusMap[status] || { label: status, className: "badge-secondary" }
      );
    }

    if (type === "hotel") {
      const statusMap = {
        pending: { label: "승인대기", className: "badge-warning" },
        approved: { label: "승인", className: "badge-success" },
        rejected: { label: "거부", className: "badge-danger" },
        active: { label: "활성", className: "badge-success" },
        inactive: { label: "비활성", className: "badge-secondary" },
      };
      return (
        statusMap[status] || { label: status, className: "badge-secondary" }
      );
    }

  if (type === "user") {
      const statusMap = {
        active: { label: "활성", className: "badge-success" },
        inactive: { label: "비활성", className: "badge-secondary" },
        suspended: { label: "정지", className: "badge-danger" },
      };
      return (
        statusMap[status] || { label: status, className: "badge-secondary" }
      );
    }

  if (type === "review") {
    const statusMap = {
      published: { label: "노출", className: "badge-success" },
      hidden: { label: "숨김", className: "badge-secondary" },
      reported: { label: "신고됨", className: "badge-warning" },
      resolved: { label: "처리완료", className: "badge-info" },
    };
    return (
      statusMap[status] || { label: status, className: "badge-secondary" }
    );
  }

  if (type === "coupon") {
    const statusMap = {
      active: { label: "사용중", className: "badge-success" },
      scheduled: { label: "예약됨", className: "badge-info" },
      expired: { label: "만료", className: "badge-secondary" },
      paused: { label: "중단", className: "badge-warning" },
    };
    return (
      statusMap[status] || { label: status, className: "badge-secondary" }
    );
  }

    return { label: status, className: "badge-secondary" };
  };

  const config = getStatusConfig();

  return <span className={`badge ${config.className}`}>{config.label}</span>;
};

export default StatusBadge;
