import jwt from 'jsonwebtoken';

export const generateToken = (user: any) => {
    return jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET!, {
        expiresIn: '1h',
    });
};

export const verifyToken = (token: string) => {
    try {
      return jwt.verify(token, process.env.JWT_SECRET!);
    } catch (error) {
      throw new Error('Invalid token');
    }
  };