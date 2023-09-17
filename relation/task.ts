import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, Unique, ManyToOne } from "typeorm"
import { User } from "./users"

@Entity()
export class task extends BaseEntity {
  @PrimaryGeneratedColumn()
  task_id: number;

  @Column({ default: `""` })
  task_name: string;

  @Column({ default: `""` })
  task_description: string;

  @Column({ default: '0' })
  status: string;

  @Column({ default: '0' })
  assign_by_manager: number;

  @ManyToOne(()=>User,user => user.user_id)
  @JoinColumn({name: 'assign_to_userid'})
  assign_to_userid: User;

  @Column()
  start_date: string;

  @Column()
  end_date: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
  length: number;
}
