export default abstract class IRepository<T> {
  // users: IRepository<User>;

  abstract findOne(options: object): Promise<T>;
  abstract find(options: object): Promise<T[]>;
  abstract create(options: object): T;
  abstract delete(options: object): Promise<object>;
  abstract save(options: object, save_options: object): Promise<object>;
}
