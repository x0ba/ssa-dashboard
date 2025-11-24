export {};

// Create a type for the Roles
export type Roles = "admin" | "moderator";

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles;
      onboardingComplete?: boolean;
      instrument?: string;
      major?: string;
      graduationYear?: number;
    };
  }
}
