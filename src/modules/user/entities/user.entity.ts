import {
  Column, CreateDateColumn, Entity, Index, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';

@Entity('user')
@Index('idx_user_email', ['email'], { unique: true })
export class UserEntity {
  @PrimaryColumn()
  user_id: string;

  @Column({ length: 255 })
  email: string;

  @Column('boolean', { default: false })
  email_verified: boolean;

  @Column({ length: 255 })
  name: string;

  @Column('text', { nullable: true })
  picture: string | null;

  @Column({ length: 20, nullable: true  })
  phone_number: string | null;

  @Column({ default: false })
  disabled: boolean;

  @Column({ nullable: true  })
  last_login_at: Date;

  @CreateDateColumn()
  created_at: Date; // ISO Date

  @UpdateDateColumn()
  updated_at: Date;
}