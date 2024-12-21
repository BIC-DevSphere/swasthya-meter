import bcrypt from 'bcrypt';

// Hash the password before storing it in the database
export async function hashPassword(password) {
    const saltRounds = 10; 
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  }
  
  // Verify the password during login
  export async function verifyPassword(password, hashedPassword) {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  }
  