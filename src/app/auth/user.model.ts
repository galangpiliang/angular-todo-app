export class User {
  constructor(
    public id: string,
    public fullname: string,
    public email: string,
    public image: string,
    private _token: string
  ) {}

  get token() {
    return this._token;
  }
}
