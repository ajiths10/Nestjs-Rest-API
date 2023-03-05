import { Users } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Timestamp,
} from 'typeorm';

@Entity({ name: 'events' })
export class Event {
  @PrimaryGeneratedColumn({ type: 'tinyint' })
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column()
  location: string;

  @Column()
  image: string;

  @Column({ type: 'timestamp' })
  date: Date;

  @Column({ nullable: true, type: 'timestamp' })
  created_at?: Date;

  @Column({ nullable: true, type: 'timestamp' })
  updated_at?: Date;

  @Column({ default: 1, nullable: true })
  is_active?: number;

  @Column({ default: false })
  is_featured?: boolean;

  @ManyToOne(() => Users, (user) => user.event)
  user: Users;
}
