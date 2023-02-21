import {
  Column,
  Entity,
  JoinColumn,
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

  @Column({ unique: true, type: 'text' })
  email: string;

  @Column({ nullable: true, type: 'timestamp' })
  created_at?: Date;

  @Column({ nullable: true, type: 'timestamp' })
  updated_at?: Date;

  @Column({ default: 1, nullable: true })
  is_active?: number;

  @OneToOne(() => CutomUsers)
  @JoinColumn()
  custom_user: CutomUsers;
}
