import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'somehost',
      port: 3306,
      username: 'someuser',
      password: 'somepw',
      database: 'somedb',
      entities: [],
      synchronize: true
    })
    //, some modules
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
