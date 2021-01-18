import {
  Column, CreateDateColumn, Entity, Index, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';

@Entity('users')
@Index('idx_uid', ['uid'], { unique: true })
@Index('idx_user_email', ['email'], { unique: true })
export class UserEntity {
  @PrimaryGeneratedColumn()
  iduser: number;

  @Column({ collation: 'utf8_bin' })
  uid: string;

  @Column('tinyint', { default: 0 })
  user_role: number;

  @Column({ length: 255 })
  email: string;

  @Column('boolean', { default: false })
  email_verified: boolean;

  @Column({ length: 255 })
  display_name: string;

  @Column('text', { nullable: true })
  photo_url: string | null;

  @Column({ length: 20, nullable: true })
  phone_number: string | null;

  @Column({ default: false })
  disabled: boolean;

  @CreateDateColumn()
  created_at: Date; // ISO Date

  @UpdateDateColumn()
  updated_at: Date;
}