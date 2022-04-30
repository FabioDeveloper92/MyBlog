export class PostsFilter {
  constructor(
    public orderByVisibility: number,
    public filterByTime: number,
    public limit: number
  ) {}
}
