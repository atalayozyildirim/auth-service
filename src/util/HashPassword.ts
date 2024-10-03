import bcrypt from "bcryptjs";

const HashPassword = async (password: string) => {
  const salt: any = await bcrypt.genSalt(10);

  return bcrypt.hash(password.toString(), salt);
};

const ComparePassword = async (
  plainPassword: string,
  hashedPassword: string
) => {
  try {
    return await bcrypt.compare(plainPassword, hashedPassword);
  } catch (error) {
    console.error("Error comparing passwords:", error);
    return false;
  }
};

export { HashPassword, ComparePassword };
