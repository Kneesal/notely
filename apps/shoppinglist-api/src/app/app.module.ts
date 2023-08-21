import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { User } from '../modules/user/user.entity'
import { UsersModule } from '../modules/user/user.module'
import { DataSource } from 'typeorm'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'somehost',
      port: 3306,
      username: 'someuser',
      password: 'somepw',
      database: 'somedb',
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
