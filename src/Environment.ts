/**
 * Create an envID
 */
export const createEnvironmentId = () => `env_${Math.ceil(Math.random() * (9999999 - 1) + 1)}`;
