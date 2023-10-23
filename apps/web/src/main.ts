import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
  console.info("Versión de la aplicación: " + environment.appVersion)
  console.info("Realizado por: Manuel Menéndez y Rafael Ruiz (Ninegon)")
  window.console.log = () => { }
}


platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
