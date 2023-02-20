import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
