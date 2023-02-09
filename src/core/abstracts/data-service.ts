import { User } from '../entities/user.entity';
import IRepository from './generic-repository';

export default abstract class IDataService {
  users: IRepository<User>;
}
