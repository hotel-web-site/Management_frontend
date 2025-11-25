import { useState, useEffect } from "react";

const DEFAULT_PROFILE = {
  name: "",
  email: "",
  phone: "",
  role: "admin",
  department: "",
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const AdminProfileForm = ({ profile = {}, onSubmit }) => {
  const [formData, setFormData] = useState({ ...DEFAULT_PROFILE, ...profile });

  useEffect(() => {
    setFormData((prev) => ({ ...prev, ...profile }));
  }, [profile]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      formData.newPassword &&
      formData.newPassword !== formData.confirmPassword
    ) {
      alert("새 비밀번호가 일치하지 않습니다.");
      return;
    }

    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      department: formData.department,
      currentPassword: formData.currentPassword,
      newPassword: formData.newPassword,
    };

    onSubmit?.(payload);
  };

  const handleReset = () => {
    setFormData({ ...DEFAULT_PROFILE, ...profile });
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h2>기본 정보</h2>

      <div className="form-group">
        <label htmlFor="adminName">이름</label>
        <input
          id="adminName"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="관리자 이름"
        />
      </div>

      <div className="form-group">
        <label htmlFor="adminEmail">이메일</label>
        <input
          id="adminEmail"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="adminPhone">연락처</label>
        <input
          id="adminPhone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          placeholder="010-0000-0000"
        />
      </div>

      <div className="form-group">
        <label htmlFor="adminDept">담당 부서</label>
        <input
          id="adminDept"
          name="department"
          value={formData.department}
          onChange={handleChange}
          placeholder="예) 운영팀"
        />
      </div>

      <div className="form-group">
        <label htmlFor="adminRole">권한</label>
        <input
          id="adminRole"
          name="role"
          value={formData.role}
          onChange={handleChange}
          disabled
        />
      </div>

      <h2>보안 설정</h2>

      <div className="form-group">
        <label htmlFor="currentPassword">현재 비밀번호</label>
        <input
          id="currentPassword"
          name="currentPassword"
          type="password"
          value={formData.currentPassword}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="newPassword">새 비밀번호</label>
        <input
          id="newPassword"
          name="newPassword"
          type="password"
          value={formData.newPassword}
          onChange={handleChange}
          placeholder="영문+숫자 8자 이상"
        />
      </div>

      <div className="form-group">
        <label htmlFor="confirmPassword">새 비밀번호 확인</label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
      </div>

      <div className="form-actions">
        <button type="button" className="btn btn-outline" onClick={handleReset}>
          되돌리기
        </button>
        <button type="submit" className="btn btn-primary">
          저장
        </button>
      </div>
    </form>
  );
};

export default AdminProfileForm;