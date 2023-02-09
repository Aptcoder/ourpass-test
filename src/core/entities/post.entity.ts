import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: false,
  })
  title: string;

  @Column({
    nullable: false,
  })
  body: string;

  @Column({
    nullable: false,
  })
  userId: string;

  @ManyToOne((type) => User)
  @JoinColumn({ name: 'userId ' })
  user: User;

  @Column({ type: 'timestamptz', nullable: true })
  deletedAt: Date;
}
