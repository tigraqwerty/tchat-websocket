import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WrapperComponent } from './layouts/wrapper/wrapper.component';

@NgModule({
  declarations: [WrapperComponent],
  imports: [CommonModule],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
    };
  }
}
