import { supabase } from "lib/supabase";
import { prisma } from "src/clients/prisma";

// Function to register a new user with role (sales person or admin)
export const registerUser = async (
  email: string,
  password: string,
  role: "sales" | "admin"
) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      // options: {
      //   emailRedirectTo: `${location.origin}/auth/callback`,
      // },
    });

    if (error) {
      throw new Error(error.message);
    }

    const response = await prisma.user.create({
      data: {
        email,
        role,
      },
    });

    return { userData: response, authData: data };
  } catch (error) {
    throw new Error("Registration failed. Please try again.");
  }
};

// Function to log in a user
export const loginUser = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      throw new Error(error?.message);
    }
    return data;
  } catch (error) {
    throw new Error("Login failed. Please check your credentials.");
  }
};

// Function to log out a user
export const logoutUser = async () => {
  try {
    await supabase.auth.signOut();
  } catch (error) {
    throw new Error("Logout failed. Please try again.");
  }
};
