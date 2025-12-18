import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
  const menuItems = [
    { path: "/admin/dashboard", label: "대시보드", icon: "📊" },
    { path: "/admin/hotels", label: "내 호텔 관리", icon: "🏨" },
    { path: "/owner/rooms", label: "객실 관리", icon: "🛏️" },
    { path: "/admin/bookings", label: "예약 관리", icon: "📅" },
    { path: "/admin/reviews", label: "리뷰 관리", icon: "⭐" },
    { path: "/admin/me", label: "내 정보", icon: "👤" },
  ];

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-inner">
        <div className="sidebar-logo">
          <h2>Hotel Admin</h2>
        </div>
        <nav>
          <ul className="sidebar-menu">
            {menuItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default AdminSidebar;
