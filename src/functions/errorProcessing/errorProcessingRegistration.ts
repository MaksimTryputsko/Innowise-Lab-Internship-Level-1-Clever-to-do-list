import toast from "react-hot-toast";

export const errorProcessingRegistration = (err: string) => {
  switch (err) {
    case "Firebase: Error (auth/invalid-email).":
      return toast.error("Your email is invalid, pease write correct e-mail !");
    case "Firebase: Error (auth/email-already-in-use).":
      return toast.error("This email already use, try with other e-mail !");
    default:
      return toast.error(
        "Change password please, your password mast have minimum 9 symbols !",
      );
  }
};
