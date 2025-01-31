module.exports = {
  extends: ["next/core-web-vitals"],
  rules: {
    "react/no-unescaped-entities": "off",
    "@typescript-eslint/no-unused-vars": "warn", // or "off" to disable
    "react-hooks/exhaustive-deps": "warn", // or "off" to disable
    "@typescript-eslint/no-explicit-any": "off"
  }
};