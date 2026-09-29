import crypto from "crypto";

export const ADMIN_EMAIL = "crevosysofficial@gmail.com";
export const OTP_EXPIRY_SECONDS = 120; // 2 minutes strictly

const SECRET =
  process.env.ADMIN_AUTH_SECRET ||
  process.env.RESEND_API_KEY ||
  "crevosys_default_secure_secret_key_2026_auth_982";

interface OtpPayload {
  hash: string;
  salt: string;
  expiresAt: number;
  email: string;
}

function sign(data: string): string {
  return crypto.createHmac("sha256", SECRET).update(data).digest("hex");
}

function hashOtp(otp: string, salt: string): string {
  return crypto.createHmac("sha256", salt).update(otp).digest("hex");
}

/**
 * Generates a cryptographically secure 6-digit OTP code
 */
export function generateOtp(): string {
  return crypto.randomInt(100000, 1000000).toString();
}

/**
 * Creates an HMAC signed challenge token containing the hashed OTP and 2-minute expiry
 */
export function createOtpChallenge(otp: string): {
  token: string;
  expiresAt: number;
} {
  const salt = crypto.randomBytes(16).toString("hex");
  const expiresAt = Date.now() + OTP_EXPIRY_SECONDS * 1000;
  const hash = hashOtp(otp, salt);

  const payload: OtpPayload = {
    hash,
    salt,
    expiresAt,
    email: ADMIN_EMAIL,
  };

  const serialized = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = sign(serialized);
  const token = `${serialized}.${signature}`;

  return { token, expiresAt };
}

/**
 * Verifies the user-entered OTP against the signed challenge token
 */
export function verifyOtpChallenge(
  token: string | undefined,
  enteredOtp: string
): { valid: boolean; error?: string } {
  if (!token) {
    return { valid: false, error: "No active verification session found. Please request a new code." };
  }

  const parts = token.split(".");
  if (parts.length !== 2) {
    return { valid: false, error: "Invalid challenge token format." };
  }

  const [serialized, signature] = parts;
  const expectedSignature = sign(serialized);

  try {
    const isValidSig = crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    );
    if (!isValidSig) {
      return { valid: false, error: "Security signature mismatch." };
    }
  } catch {
    return { valid: false, error: "Security validation error." };
  }

  let payload: OtpPayload;
  try {
    payload = JSON.parse(Buffer.from(serialized, "base64url").toString("utf-8"));
  } catch {
    return { valid: false, error: "Failed to parse challenge token." };
  }

  // Check 2-minute expiration
  const now = Date.now();
  if (now > payload.expiresAt) {
    return {
      valid: false,
      error: "Verification code has expired (exceeded 2 minutes). Please request a new code.",
    };
  }

  // Check OTP match
  const enteredHash = hashOtp(enteredOtp.trim(), payload.salt);
  try {
    const isMatch = crypto.timingSafeEqual(
      Buffer.from(enteredHash),
      Buffer.from(payload.hash)
    );
    if (!isMatch) {
      return { valid: false, error: "Incorrect verification code. Please check your inbox and try again." };
    }
  } catch {
    return { valid: false, error: "Code verification failed." };
  }

  return { valid: true };
}

import { SignJWT, jwtVerify, type JWTPayload } from "jose";

export interface SessionPayload extends JWTPayload {
  role: "admin";
  email: string;
  createdAt?: number;
  lastActive?: number;
}

// 2 days session expiry (48 hours = 172,800 seconds)
export const SESSION_EXPIRY_SECONDS = 2 * 24 * 60 * 60;

function getJwtKey(): Uint8Array {
  const secret =
    process.env.ADMIN_AUTH_SECRET ||
    process.env.RESEND_API_KEY ||
    "crevosys_default_secure_secret_key_2026_auth_982";
  return new TextEncoder().encode(secret);
}

/**
 * Creates a signed 2-day JWT admin session token.
 * Admin does not need to re-verify for 2 days once authenticated.
 */
export async function createAdminJwtToken(): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const expiresAt = now + SESSION_EXPIRY_SECONDS;

  return await new SignJWT({
    role: "admin",
    email: ADMIN_EMAIL,
    createdAt: now,
    lastActive: now,
  })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuedAt(now)
    .setExpirationTime(expiresAt)
    .sign(getJwtKey());
}

/**
 * Backwards-compatible session token creator
 */
export async function createSessionToken(): Promise<string> {
  return createAdminJwtToken();
}

/**
 * Validates whether the given JWT session token is active and unexpired (within 2 days).
 * Returns validity status and payload.
 */
export async function verifyAdminJwtToken(
  token: string | undefined
): Promise<{
  valid: boolean;
  expired?: boolean;
  payload?: SessionPayload;
  remainingSeconds?: number;
}> {
  if (!token) return { valid: false };

  try {
    const { payload } = await jwtVerify(token, getJwtKey());
    if (payload.role !== "admin") return { valid: false };

    const exp = (payload.exp ?? 0) as number;
    const now = Math.floor(Date.now() / 1000);
    const remainingSeconds = Math.max(0, exp - now);

    return {
      valid: true,
      payload: payload as unknown as SessionPayload,
      remainingSeconds,
    };
  } catch (err: unknown) {
    const isExpired =
      err &&
      typeof err === "object" &&
      "code" in err &&
      (err as { code: string }).code === "ERR_JWT_EXPIRED";

    return {
      valid: false,
      expired: Boolean(isExpired),
    };
  }
}

/**
 * Validates whether the given session token is active and unexpired.
 * Compatible with async JWT verification.
 */
export async function verifySessionToken(token: string | undefined): Promise<boolean> {
  const result = await verifyAdminJwtToken(token);
  return result.valid;
}


/**
 * Generates the plain-text fallback for 2FA email (crucial for anti-spam rating)
 */
export function renderOtpEmailText(otp: string, expiresAt?: number): string {
  const expiryDate = expiresAt
    ? new Date(expiresAt)
    : new Date(Date.now() + OTP_EXPIRY_SECONDS * 1000);
  const formattedTime = expiryDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return `Verify your identity

Use the code below to complete your two-factor verification.

Verification code: ${otp}

This code is valid for 2 minutes and expires at ${formattedTime}.

Don't share this code. If you didn't request this code, you can safely ignore this email. Crevosys will never ask for your verification code.

© ${new Date().getFullYear()} Crevosys. All rights reserved.`;
}

/**
 * Renders the high-end branded HTML email for 2FA
 */
export function renderOtpEmailHtml(otp: string, expiresAt?: number): string {
  const expiryDate = expiresAt
    ? new Date(expiresAt)
    : new Date(Date.now() + OTP_EXPIRY_SECONDS * 1000);
  const formattedTime = expiryDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify your identity</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f6f7fa;">
  <div
    style="
      margin: 0;
      padding: 24px 12px;
      background: #f6f7fa;
      font-family: Arial, Helvetica, sans-serif;
      color: #171a21;
    "
  >
    <div
      style="
        width: 100%;
        max-width: 480px;
        margin: 0 auto;
        background: #ffffff;
        border: 1px solid #e8e9ed;
        border-radius: 14px;
        overflow: hidden;
      "
    >

      <!-- Logo -->
      <div
        style="
          padding: 26px 20px 22px;
          text-align: center;
          border-bottom: 1px solid #eeeeee;
        "
      >
        <a
          href="https://www.crevosys.com"
          target="_blank"
          style="text-decoration: none;"
        >
          <img
            src="https://i.postimg.cc/fbmXY62k/crevosys-thunder-smooth-main.png"
            alt="Crevosys"
            width="130"
            style="
              width: 130px;
              max-width: 100%;
              height: auto;
              display: inline-block;
            "
          />
        </a>
      </div>

      <!-- Content -->
      <div style="padding: 30px 22px;">

        <h1
          style="
            margin: 0 0 10px;
            font-size: 24px;
            line-height: 32px;
            font-weight: 700;
            color: #171a21;
          "
        >
          Verify your identity
        </h1>

        <p
          style="
            margin: 0 0 24px;
            font-size: 14px;
            line-height: 21px;
            color: #69707d;
          "
        >
          Use the code below to complete your two-factor verification.
        </p>

        <!-- OTP -->
        <div
          style="
            padding: 20px 12px;
            margin-bottom: 20px;
            text-align: center;
            background: #f7f5ff;
            border: 1px solid #e7e0ff;
            border-radius: 12px;
          "
        >
          <p
            style="
              margin: 0 0 8px;
              font-size: 11px;
              line-height: 16px;
              font-weight: 600;
              letter-spacing: 1px;
              color: #858b98;
              text-transform: uppercase;
            "
          >
            Verification code
          </p>

          <p
            style="
              margin: 0;
              font-size: 30px;
              line-height: 38px;
              font-weight: 700;
              letter-spacing: 6px;
              color: #6545c7;
            "
          >
            ${otp}
          </p>
        </div>

        <!-- Expiration -->
        <p
          style="
            margin: 0 0 20px;
            font-size: 13px;
            line-height: 20px;
            color: #737b88;
          "
        >
          This code is valid for
          <strong style="color: #30343d;">2 minutes</strong>
          and expires at
          <strong style="color: #6545c7;">${formattedTime}</strong>.
        </p>

        <!-- Security -->
        <div
          style="
            padding-top: 18px;
            border-top: 1px solid #eeeeee;
          "
        >
          <p
            style="
              margin: 0 0 8px;
              font-size: 13px;
              line-height: 20px;
              color: #555d6b;
            "
          >
            <strong style="color: #252a33;">Don't share this code.</strong>
          </p>

          <p
            style="
              margin: 0;
              font-size: 12px;
              line-height: 19px;
              color: #8a919d;
            "
          >
            If you didn't request this code, you can safely ignore this email.
            Crevosys will never ask for your verification code.
          </p>
        </div>

      </div>

      <!-- Footer -->
      <div
        style="
          padding: 18px 20px;
          text-align: center;
          background: #fafafa;
          border-top: 1px solid #eeeeee;
        "
      >
        <p
          style="
            margin: 0;
            font-size: 11px;
            line-height: 17px;
            color: #9aa0aa;
          "
        >
          &copy; ${new Date().getFullYear()} Crevosys. All rights reserved.
        </p>
      </div>

    </div>
  </div>
</body>
</html>`;
}
