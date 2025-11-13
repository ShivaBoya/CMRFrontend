import authReducer, { logout } from "../features/auth/authSlice";

describe("authSlice", () => {
  it("should return initial state", () => {
    expect(authReducer(undefined, { type: "" })).toEqual({
      token: null,
      user: null,
      loading: false,
      error: null,
    });
  });

  it("should handle logout", () => {
    const prevState = {
      token: "abc",
      user: { name: "Test" },
      loading: false,
      error: null,
    };

    expect(authReducer(prevState, logout())).toEqual({
      token: null,
      user: null,
      loading: false,
      error: null,
    });
  });
});
