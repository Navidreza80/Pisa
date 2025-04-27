import http from "@/utils/interceptor";

const login = async (user: { password: string; email: string }) => {
  try {
    const result = await http.post(`/auth/login`, user);
    return result;
  } catch (error) {
    return error;
  }
};

export { login };
