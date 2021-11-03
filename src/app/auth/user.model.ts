export class User {
  constructor(
    public email: string,
    public localId: string,
    public idToken: string,
    public tokenExpirationDate: Date
  ) {}

  get token() {
    if (!this.tokenExpirationDate || new Date() > this.tokenExpirationDate)
      return null;
    return this.idToken;
  }
}
