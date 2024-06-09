import { Entity, Column, PrimaryColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class List {
  @PrimaryColumn()
  id: string

  @Column()
  owner: string

  @UpdateDateColumn()
  updatedAt: Date
}
