import { Todo } from 'src/todos/entities/todo.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CutomUsers } from './customusers.entity';

@Entity({ name: 'users' })
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ type: 'text' })
  password: string;

  @Column({ unique: true, type: 'text' })
  email: string;

  @Column({ nullable: true, type: 'timestamp' })
  created_at?: Date;

  @Column({ nullable: true, type: 'timestamp' })
  updated_at?: Date;

  @Column({ default: 1, nullable: true })
  is_active?: number;

  @Column({ default: false })
  is_admin: boolean;

  @OneToOne(() => CutomUsers, (u) => u.id)
  custom_user: CutomUsers;
}
