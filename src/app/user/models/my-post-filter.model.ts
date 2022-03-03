export class MyPostFilter {
  constructor(
    public title: string,
    public status: number,
    public orderByDate: number,
    public limit: number
  ) {}
}
