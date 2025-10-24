import aj from "../lib/arcjet.js";
import { isSpoofedBot } from "@arcjet/inspect";

export const arcjetProtection = async (req, res, next) => {
  try {
    const decision = await aj.protect(req);
    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return res.status(429).json({ message: "Rate limit exceeded" });
      } else if (decision.reason.isBot()) {
        return res.status(403).json({ message: "Bot access Denied" });
      } else {
        return res
          .status(403)
          .json({ message: "Access deied by security policy" });
      }
    }

    //check for spoofed Bot (Pretendeding to be human)
    if (decision.results.some(isSpoofedBot)) {
      res.status(403).json({
        message: "malicious bot activity detected",
        error: "Spoofed Bot Detected",
      });
    } else {
      next();
    }
  } catch (err) {}
};
