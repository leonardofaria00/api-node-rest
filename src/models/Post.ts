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
  messege: string;

  @ManyToOne((type) => User, (user) => user.posts)
  user: User;
}
