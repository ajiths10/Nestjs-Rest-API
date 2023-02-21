import { Users } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  todo: string;

  @Column({ nullable: true, type: 'timestamp' })
  created_at?: Date;

  @Column({ nullable: true, type: 'timestamp' })
  updated_at?: Date;

  @Column({ default: 1, nullable: true })
  is_active?: number;

  @ManyToOne(() => Users)
  @JoinColumn()
  user: Users;
}
