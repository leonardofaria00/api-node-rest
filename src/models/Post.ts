import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { User } from './User';

@Entity()
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  messege: string;

  @Column()
  url: string;

  @Column()
  filename: string;

  @Column()
  originalName: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @ManyToOne((type) => User, (user) => user.posts)
  user: User;
}
