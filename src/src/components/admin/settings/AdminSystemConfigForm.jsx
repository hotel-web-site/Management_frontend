import { useState, useEffect } from "react";

const DEFAULT_CONFIG = {
  siteName: "",
  siteEmail: "",
  supportEmail: "",
  notificationEmail: "",
  timezone: "Asia/Seoul",
  maintenanceMode: false,
  bookingEnabled: true,
  reviewEnabled: true,
};

const AdminSystemConfigForm = ({ config = {}, onSubmit }) => {
  const [formData, setFormData] = useState({ ...DEFAULT_CONFIG, ...config });

  useEffect(() => {
    setFormData({ ...DEFAULT_CONFIG, ...config });
  }, [config]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit?.(formData);
  };

  const handleReset = () => {
    setFormData({ ...DEFAULT_CONFIG, ...config });
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h2>사이트 기본 정보</h2>

      <div className="form-group">
        <label htmlFor="siteName">사이트 이름</label>
        <input
          id="siteName"
          name="siteName"
          value={formData.siteName}
          onChange={handleChange}
          placeholder="예) Hotel Booking Admin"
        />
      </div>

      <div className="form-group">
        <label htmlFor="siteEmail">관리자 이메일</label>
        <input
          id="siteEmail"
          name="siteEmail"
          type="email"
          value={formData.siteEmail}
          onChange={handleChange}
          placeholder="admin@example.com"
        />
      </div>

      <div className="form-group">
        <label htmlFor="supportEmail">고객지원 이메일</label>
        <input
          id="supportEmail"
          name="supportEmail"
          type="email"
          value={formData.supportEmail}
          onChange={handleChange}
          placeholder="support@example.com"
        />
      </div>

      <div className="form-group">
        <label htmlFor="notificationEmail">알림 수신 이메일</label>
        <input
          id="notificationEmail"
          name="notificationEmail"
          type="email"
          value={formData.notificationEmail}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="timezone">기본 타임존</label>
        <select
          id="timezone"
          name="timezone"
          value={formData.timezone}
          onChange={handleChange}
        >
          <option value="Asia/Seoul">(GMT+9) 서울</option>
          <option value="Asia/Tokyo">(GMT+9) 도쿄</option>
          <option value="Asia/Shanghai">(GMT+8) 상하이</option>
          <option value="UTC">UTC</option>
        </select>
      </div>

      <div className="form-group">
        <label className="checkbox">
          <input
            type="checkbox"
            name="maintenanceMode"
            checked={formData.maintenanceMode}
            onChange={handleChange}
          />
          <span>유지보수 모드 활성화</span>
        </label>
        <small>활성화 시 모든 사용자에게 점검 안내가 노출됩니다.</small>
      </div>

      <div className="form-group">
        <label className="checkbox">
          <input
            type="checkbox"
            name="bookingEnabled"
            checked={formData.bookingEnabled}
            onChange={handleChange}
          />
          <span>예약 기능 사용</span>
        </label>
      </div>

      <div className="form-group">
        <label className="checkbox">
          <input
            type="checkbox"
            name="reviewEnabled"
            checked={formData.reviewEnabled}
            onChange={handleChange}
          />
          <span>리뷰 작성 허용</span>
        </label>
      </div>

      <div className="form-actions">
        <button type="button" className="btn btn-outline" onClick={handleReset}>
          초기화
        </button>
        <button type="submit" className="btn btn-primary">
          저장
        </button>
      </div>
    </form>
  );
};

export default AdminSystemConfigForm;