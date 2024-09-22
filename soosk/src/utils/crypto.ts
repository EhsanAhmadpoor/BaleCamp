import { createHmac } from "crypto";

export async function hmac(text: string): Promise<Buffer> {
  const hmacGen = createHmac("SHA3-512", "password");
  return hmacGen.update(text).digest();
}
