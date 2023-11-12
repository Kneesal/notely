import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { User } from '../modules/user/user.entity'
import { UsersModule } from '../modules/user/user.module'
import { DataSource } from 'typeorm'

const dbPort = parseInt(process.env.DB_PORT)
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: dbPort,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User],
      synchronize: true
    }),
    UsersModule
    //, some modules
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
