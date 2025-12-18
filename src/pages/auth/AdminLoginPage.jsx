import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "../../hooks/useAdminAuth";

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAdminAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 1. 로그인 요청 (백엔드로 아이디/비번 발사)
      const response = await authApi.login({ email, password });

      // 2. 받아온 데이터에서 'role' 확인 (백엔드가 user 정보 줄 거임)
      // (보통 response.user 또는 response.data.user에 들어있음. 콘솔 찍어봐!)
      const { user, token } = response;

      // 토큰 저장 (이건 원래 하던 거고)
      localStorage.setItem('accessToken', token);

      // 🚨 3. 여기가 핵심! (역할별 납치) 🚨
      if (user.role === 'admin') {
        // 관리자면 -> 관리자 대시보드로
        navigate('/admin/dashboard', { replace: true });
      } else if (user.role === 'business') {
        // 박사장(Business)이면 -> 오너 대시보드로 납치
        navigate('/owner/dashboard', { replace: true }); // 👈 아까 만든 그 주소!
      } else {
        // 혹시 이상한 놈(일반 유저)이 여기로 로그인하면?
        alert("관리자 또는 사업자만 접속 가능합니다.");
        navigate('/'); // 메인으로 쫓아내
      }

    } catch (err) {
      console.error(err);
      setError("로그인에 실패했습니다.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>관리자 및 파트너 로그인</h2>

        {/* 👇 개발용 샘플 계정 안내 (박사장 추가함) */}
        <div className="sample-account-info" style={{ background: "#f8f9fa", padding: "15px", borderRadius: "8px", marginBottom: "20px", fontSize: "0.9rem", color: "#555" }}>
          <p style={{ fontWeight: "bold", marginBottom: "5px" }}>📌 테스트 계정 정보</p>
          <div style={{ marginBottom: "8px" }}>
            <span style={{ fontWeight: "bold", color: "#d32f2f" }}>[관리자]</span><br />
            ID: admin@hotelhub.com <br />
            PW: admin1234
          </div>
          <div>
            <span style={{ fontWeight: "bold", color: "#1976d2" }}>[사업자]</span><br />
            ID: owner@hotelhub.com <br />
            PW: password123
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {error && <div className="error-message" style={{ color: "red", marginBottom: "10px" }}>{error}</div>}

          <div className="form-group">
            <label>이메일</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="이메일을 입력하세요"
              required
            />
          </div>

          <div className="form-group">
            <label>비밀번호</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="비밀번호를 입력하세요"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: "100%", padding: "10px", marginTop: "10px" }}>
            {loading ? "로그인 중..." : "로그인"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
