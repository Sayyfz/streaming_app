export function throwError(message: string, status: number): never {
  throw {
    status,
    message,
  };
}
