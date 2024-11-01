import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as Joi from 'joi';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { GoogleStrategy } from './strategies/google.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { TodosModule } from './todos/todos.module';
import { ProjectsModule } from './projects/projects.module';
import { LabelsModule } from './labels/labels.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DATABASE_URL: Joi.string().required(),
        DIRECT_URL: Joi.string().required(),
        GOOGLE_CLIENT_ID: Joi.string().required(),
        GOOGLE_CLIENT_SECRET: Joi.string().required(),
        GOOGLE_CALLBACK_URL: Joi.string().required(),
        APP_JWT_SECRET: Joi.string().required(),
      }),
    }),
    AuthModule,
    PassportModule,
    JwtModule.register({
      global: true,
    }),
    PrismaModule,
    TodosModule,
    ProjectsModule,
    LabelsModule,
  ],
  controllers: [AppController],
  providers: [AppService, GoogleStrategy, JwtStrategy, PrismaService],
})
export class AppModule {}
