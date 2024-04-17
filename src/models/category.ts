import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm'
import { Record } from './record'

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  name!: string

  @Column()
  path!: string

  @OneToMany((_type) => Record, (record: Record) => record.category)
  records!: Array<Record>

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date
}
