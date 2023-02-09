export default abstract class IRepository<T> {
  // users: IRepository<User>;

  abstract findOne(options: object): Promise<T>;
  abstract find(options: object): Promise<T[]>;
  abstract create(options: object): T;
}