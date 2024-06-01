import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 100 })
  username!: string;

  @Column({ type: 'int' })
  age!: number;

  @Column('simple-array')
  hobbies!: string[];
}
