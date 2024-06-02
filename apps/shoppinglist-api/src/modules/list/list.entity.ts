import { Entity, Column, PrimaryColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class List {
  @PrimaryColumn()
  id: string

  @Column()
  value: string

  @Column()
  done: boolean

  @UpdateDateColumn
  updatedAt: Date
}
