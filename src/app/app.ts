import { Component, signal } from '@angular/core';
import { HeroComponent } from './hero/hero.component';
import { PositionsComponent } from './positions/positions.component';

@Component({
  selector: 'app-root',
  imports: [HeroComponent, PositionsComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('oa-csd-hub-ui');
}
