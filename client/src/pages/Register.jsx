import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Name is required";

    if (!form.email.trim()) {
      next.email = "Email is required";
    } else if (!EMAIL_REGEX.test(form.email.trim())) {
      next.email = "Enter a valid email address";
    }

    if (!form.password) {
      next.password = "Password is required";
    } else if (form.password.length < 6) {
      next.password = "Password must be at least 6 characters";
    }

    if (!form.confirmPassword) {
      next.confirmPassword = "Please confirm your password";
    } else if (form.confirmPassword !== form.password) {
      next.confirmPassword = "Passwords do not match";
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    if (!validate()) return;

    setSubmitting(true);
    try {
      await register({
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
      });
      navigate("/", { state: { justRegistered: true } });
    } catch (err) {
      setServerError(
        err?.response?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="brand-mark">🧠</div>
        <h2>Create your account</h2>
        <p className="auth-subtitle">Join HealMind to book and track your sessions.</p>

        {serverError && <div className="form-error-banner">{serverError}</div>}

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="register-name">Full Name</label>
            <input
              id="register-name"
              type="text"
              placeholder="e.g. Aisha Khan"
              value={form.name}
              onChange={handleChange("name")}
              className={errors.name ? "invalid" : ""}
            />
            {errors.name && <div className="field-error">{errors.name}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="register-email">Email</label>
            <input
              id="register-email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange("email")}
              className={errors.email ? "invalid" : ""}
            />
            {errors.email && <div className="field-error">{errors.email}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="register-password">Password</label>
            <input
              id="register-password"
              type="password"
              placeholder="At least 6 characters"
              value={form.password}
              onChange={handleChange("password")}
              className={errors.password ? "invalid" : ""}
            />
            {errors.password && <div className="field-error">{errors.password}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="register-confirm">Confirm Password</label>
            <input
              id="register-confirm"
              type="password"
              placeholder="Re-enter your password"
              value={form.confirmPassword}
              onChange={handleChange("confirmPassword")}
              className={errors.confirmPassword ? "invalid" : ""}
            />
            {errors.confirmPassword && (
              <div className="field-error">{errors.confirmPassword}</div>
            )}
          </div>

          <button type="submit" className="btn btn-primary btn-block" disabled={submitting}>
            {submitting ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
}
