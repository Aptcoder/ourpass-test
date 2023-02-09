import { Exclude } from 'class-transformer';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Factory } from 'nestjs-seeder';
import * as bcrypt from 'bcrypt';
@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Factory((faker) => faker.name.firstName())
  @Column({
    nullable: false,
  })
  firstName: string;

  @Factory((faker) => faker.name.lastName())
  @Column({
    nullable: false,
  })
  lastName: string;

  @Factory((faker) => faker.internet.email())
  @Column({
    unique: true,
    nullable: false,
  })
  email: string;

  @Factory(() => {
    const pass = 'password';
    return bcrypt.hash(pass, 10);
  })
  @Exclude({
    toPlainOnly: true,
  })
  @Column({
    nullable: false,
  })
  password: string;

  @Column({ type: 'timestamptz', nullable: true })
  deletedAt: Date;
}
