import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm'
import { Category } from './category'

@Entity()
export class Record {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  dateOpened!: Date

  @Column()
  dateFinished!: Date

  @Column({ nullable: true })
  categoryId!: number
  @ManyToOne((_type) => Category, (category: Category) => category.records)
  @JoinColumn()
  category!: Category

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date
}
