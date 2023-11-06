import { authService } from "services/authService";
import { create } from "zustand";

interface IUser {
  email: string | null;
  id: string | null;
}

interface IUseAuthUser {
  user: IUser;
  loginUser: (email: string, password: string) => void;
  registerUser: (email: string, password: string) => void;
  logOut: () => void;
}

export const useAuthUser = create<IUseAuthUser>(set => ({
  user: {
    email: null,
    id: null,
  },

  loginUser: async (email: string, password: string) => {
    const result = await authService.loginUser(email, password);
    if (!result) {
      return;
    }

    set(state => {
      return {
        user: {
          email: result.email,
          id: result.id,
        },
      };
    });
  },

  registerUser: async (email: string, password: string) => {
    const result = await authService.registrationUser(email, password);
    if (!result) {
      return;
    }

    set(state => {
      return {
        user: {
          email: result.email,
          id: result.id,
        },
      };
    });
  },

  logOut: () =>
    set(state => {
      return {
        user: {
          email: null,
          id: null,
        },
      };
    }),
}));
