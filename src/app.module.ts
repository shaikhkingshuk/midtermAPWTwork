import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountsModule } from './Accounts/accounts.module';

@Module({
    //imports: [AccountsModule],
    imports: [AccountsModule, TypeOrmModule.forRoot(
        {
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'root',
            database: 'pos_acc',
            autoLoadEntities: true,
            synchronize: true,
        }
    ),],
  controllers: [],
  providers: [],
})
export class AppModule {}
