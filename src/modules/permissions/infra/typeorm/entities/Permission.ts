import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Group from './Group';
import Module from './Module';

@Entity('permissions')
class Permission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  canCreate: boolean;

  @Column()
  canEdit: boolean;

  @Column()
  canView: boolean;

  @Column()
  canDelete: boolean;

  @ManyToOne(() => Module, module => module.permissions)
  @JoinColumn({ name: 'module_id' })
  module: Module;

  @Column()
  module_id: string;

  @ManyToOne(() => Group, group => group.permissions)
  @JoinColumn({ name: 'group_id' })
  group: Group;

  @Column()
  group_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Permission;
