import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import UserGroup from '@modules/permissions/infra/typeorm/entities/UserGroup';
import Attendance from '@modules/attendances/infra/typeorm/entities/Attendance';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  document: string;

  @Column()
  @Exclude()
  password: string;

  @OneToMany(() => Attendance, attendances => attendances.user)
  attendances: Attendance[];

  @OneToMany(() => UserGroup, userGroups => userGroups.user)
  userGroups: UserGroup[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default User;
