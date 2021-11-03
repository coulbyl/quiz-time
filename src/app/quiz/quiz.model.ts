export class Quiz {
  constructor(
    public name: string,
    public question: string,
    public responses: string[],
    public response: string
  ) {}
}
