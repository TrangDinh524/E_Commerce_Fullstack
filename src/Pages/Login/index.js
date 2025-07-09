import { useState, useContext } from "react";
import { MyContext } from "../../App";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  const context = useContext(MyContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };
  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError("");

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call - replace with actual authentication API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // For demo purposes, accept any email/password combination
      // In real app, you would validate against your backend
      const userData = {
        id: Date.now(),
        email: formData.email,
        name: formData.email.split("@")[0], // Use email prefix as name
        token: "demo-token-" + Date.now(),
      };

      context.login(userData);
      navigate("/");
    } catch (error) {
      setLoginError("Invalid email or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="login-container">
      <div className="login-card">
        <div className="header">
          <h2>Welcome back</h2>
          <p>Sign in to your account</p>
        </div>
        {loginError && (
          <div className="alert alert-danger" role="alert">
            {loginError}
          </div>
        )}
        <form className="login-form" onSubmit={handleSubmit}>
          <div clasName="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className={`form-control ${errors.email ? "is-valid" : ""}`}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className={`form-control ${errors.password ? "is-valid" : ""}`}
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
          </div>

          <div className="form-group">
            <div className="form-check">
              <input
                type="checkbox"
                id="remember"
                className="form-check-input"
              />
              <label htmlFor="remember" className="form-check-label">
                Remember me
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-primary btn-block"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="login-footer">
          <p>
            Don't have an account?{" "}
            <Link to="/signup" className="link-primary">
              Sign up
            </Link>
          </p>
          <p>
            <Link to="/forgot-password" className="link-secondary">
              Forgot your password?
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Login;
