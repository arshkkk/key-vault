import jwt from "jsonwebtoken";

type Payload = { userId: string };
class JwtService {
  private readonly secretKey;
  constructor(secretKey: string) {
    this.secretKey = secretKey;
  }

  createToken({ expiresIn, payload }: { payload: Payload; expiresIn: string }) {
    return jwt.sign(payload, this.secretKey, { expiresIn: expiresIn });
  }

  validateToken(token: string): {
    valid: boolean;
    error: string | undefined;
    decoded: Payload | undefined;
  } {
    try {
      const decoded = jwt.verify(token, this.secretKey) as Payload;
      return { valid: true, decoded, error: undefined };
    } catch (error) {
      return { valid: false, error: "Invalid jwt", decoded: undefined };
    }
  }
}
