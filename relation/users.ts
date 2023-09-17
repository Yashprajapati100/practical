import { Entity, Column, PrimaryGeneratedColumn, BaseEntity,CreateDateColumn,UpdateDateColumn } from "typeorm"
//import { nullable } from "zod";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    user_id: number;

    @Column({default: `""` })
    user_name: string;

    @Column({default: `""` })
    user_email: string;

    @Column({default: `""` })
    user_password: string;

    @Column({default: `""` })
    user_mobileno: string;

    @Column({
      type:"text", 
     // default:`""`,
      nullable:true
    })
    authtoken: string

    @Column()
    flag: number;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;
}
