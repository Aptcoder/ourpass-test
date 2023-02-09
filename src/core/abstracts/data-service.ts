import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

export default abstract class IDataService {
  users: Repository<User>;
}
