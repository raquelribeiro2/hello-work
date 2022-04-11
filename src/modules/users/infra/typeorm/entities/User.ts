import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import Attendance from '@modules/attendances/infra/typeorm/entities/Attendance';
import Group from '@modules/permissions/infra/typeorm/entities/Group';
import Permission from '@modules/permissions/infra/typeorm/entities/Permission';

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

  @ManyToMany(() => Group)
  @JoinTable({
    name: 'users_groups',
    joinColumns: [{ name: 'user_id' }],
    inverseJoinColumns: [{ name: 'group_id' }],
  })
  groups: Group[];

  @ManyToMany(() => Permission)
  @JoinTable({
    name: 'users_permissions',
    joinColumns: [{ name: 'user_id' }],
    inverseJoinColumns: [{ name: 'permission_id' }],
  })
  permissions: Permission[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default User;
