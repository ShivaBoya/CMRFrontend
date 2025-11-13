import { useSelector } from "react-redux";

export default function useAuth() {
  const { token, user } = useSelector((s) => s.auth);
  return { isLoggedIn: !!token, user };
}
