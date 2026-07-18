import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const justRegistered = location.state?.justRegistered;

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const next = {};
    if (!form.email.trim()) {
      next.email = "Email is required";
    } else if (!EMAIL_REGEX.test(form.email.trim())) {
      next.email = "Enter a valid email address";
    }
    if (!form.password) next.password = "Password is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    if (!validate()) return;

    setSubmitting(true);
    try {
      await login({ email: form.email.trim(), password: form.password });
      navigate("/");
    } catch (err) {
      setServerError(err?.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="brand-mark">🧠</div>
        <h2>Welcome back</h2>
        <p className="auth-subtitle">Log in to manage your counselling sessions.</p>

        {justRegistered && (
          <div className="auth-success-banner">
            Account created! Please log in to continue.
          </div>
        )}
        {serverError && <div className="form-error-banner">{serverError}</div>}

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="login-email">Email</label>
            <input
              id="login-email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange("email")}
              className={errors.email ? "invalid" : ""}
            />
            {errors.email && <div className="field-error">{errors.email}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange("password")}
              className={errors.password ? "invalid" : ""}
            />
            {errors.password && <div className="field-error">{errors.password}</div>}
          </div>

          <button type="submit" className="btn btn-primary btn-block" disabled={submitting}>
            {submitting ? "Logging in..." : "Log In"}
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
}
