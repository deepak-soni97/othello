import bcrypt from "bcrypt";

export async function comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
  try {
    // Compare the plain password with the hashed password using bcrypt
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);

    return isMatch;
  } catch (error) {
    // Handle any errors that occurred during the password comparison
    console.error("Password comparison error:", error);
    return false;
  }
}
