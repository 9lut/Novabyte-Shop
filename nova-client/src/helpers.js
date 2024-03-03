import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const storeUser = (data) => {
  localStorage.setItem(
    "user",
    JSON.stringify({
      name: data.user.name,
      username: data.user.username,
      jwt: data.jwt,
      email: data.user.email,
      role: data.user.role
    })
  );
};

export const userData = () => {
  const stringifiedUser = localStorage.getItem("user") || "{}";
  return JSON.parse(stringifiedUser);
};

export const clearUser = () => {
  localStorage.removeItem("user");
};

export const Protector = ({ Component, ...rest }) => {
  const navigate = useNavigate();

  const { jwt } = userData();

  useEffect(() => {
    if (!jwt) {
      navigate("/login");
    }
  }, [navigate, jwt]);

  return <Component {...rest} />;
};
