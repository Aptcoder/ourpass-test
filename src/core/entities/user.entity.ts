import { Exclude } from 'class-transformer';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: false,
  })
  firstName: string;

  @Column({
    nullable: false,
  })
  lastName: string;

  @Column({
    unique: true,
    nullable: false,
  })
  email: string;

  @Exclude({
    toPlainOnly: true,
  })
  @Column({
    nullable: false,
  })
  password: string;

  @Column({ type: 'timestamptz' })
  deletedAt: Date;
}
