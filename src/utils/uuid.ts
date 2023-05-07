/**
 * Generate a UUID
 * @returns {string} UUID
 */
export default function generateUUID(): string {
  const hexDigits = "0123456789abcdef";
  let uuid = "";

  for (let i = 0; i < 8; i++) {
    uuid += hexDigits.charAt(Math.floor(Math.random() * hexDigits.length));
  }

  uuid += "-";

  for (let i = 0; i < 4; i++) {
    uuid += hexDigits.charAt(Math.floor(Math.random() * hexDigits.length));
  }

  uuid += "-";

  for (let i = 0; i < 4; i++) {
    uuid += hexDigits.charAt(Math.floor(Math.random() * hexDigits.length));
  }

  uuid += "-";

  for (let i = 0; i < 4; i++) {
    uuid += hexDigits.charAt(Math.floor(Math.random() * hexDigits.length));
  }

  uuid += "-";

  for (let i = 0; i < 12; i++) {
    uuid += hexDigits.charAt(Math.floor(Math.random() * hexDigits.length));
  }

  return uuid;
}
