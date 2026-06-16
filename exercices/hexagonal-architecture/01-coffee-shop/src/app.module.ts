import { Module } from "@nestjs/common";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
// import { CoffeeModule } from '@presentation/api/coffee.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "presentation", "static"),
      exclude: ["/api/*"],
    }),
    // CoffeeModule,
  ],
})
export class AppModule {}
