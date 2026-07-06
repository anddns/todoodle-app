export class InfrastructureError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options)
    this.name = new.target.name
  }
}

export class DatabaseError extends InfrastructureError {
  constructor(message: string) {
    super(message)
    this.name = new.target.name
  }
}
