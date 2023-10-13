import toast from "react-hot-toast";

export const errorProcessingLogin = (err: string) => {
  switch (err) {
    case "Firebase: Error (auth/invalid-email).":
      return toast.error("Your email is invalid, pease write correct e-mail !");
    case "Firebase: Error (auth/invalid-login-credentials).":
      return toast.error("Please write correct data !");
    default:
      return toast.error("Please, try later !");
  }
};
