export interface ConstraintViolationList {
    '@context': string;
    '@type': string;
    'hydra:description': string;
    'hydra:title': string;
    violations: Array<{
      code: string;
      message: string;
      propertyPath: string;
    }>;
  }