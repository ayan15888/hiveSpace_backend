/**
 * Mock Auth Logic for UI Porting
 */

export const useAuth = () => {
  return {
    isLoggedIn: false,
    login: () => console.log("Logged in (mock)"),
    logout: () => console.log("Logged out (mock)"),
  }
}

export const registerUser = async (data: any) => {
  console.log("Registering user (mock):", data)
  return { success: true }
}
