import { Factory } from 'nestjs-seeder';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Factory((faker) => faker.datatype.string())
  @Column({
    nullable: false,
  })
  name: string;

  @Factory((faker) => faker.datatype.string())
  @Column({
    nullable: false,
  })
  description: string;

  @Column({ type: 'timestamptz', nullable: true })
  deletedAt: Date;
}
