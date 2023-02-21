import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'cutom_users' })
export class CutomUsers {
  @PrimaryGeneratedColumn({ type: 'tinyint' })
  id: number;

  @Column({ unique: true, type: 'tinyint' })
  user_id: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({ type: 'tinyint' })
  age: number;
}
