import type { ZodError } from "zod"

export const formatZodError = (error: ZodError): string => {
  const issues = error.issues.map((issue) => {
    const path = issue.path.join(".")
    const message = issue.message
    return path ? `${path}: ${message}` : message
  })

  return `Validation failed: ${issues.join(", ")}`
}
