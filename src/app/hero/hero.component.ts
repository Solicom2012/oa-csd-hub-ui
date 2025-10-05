import { Component, inject } from '@angular/core';
import { ConfigService } from '../config.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
})
export class HeroComponent {
  protected readonly config = inject(ConfigService);

  protected imageSrc(): string {
    const image = this.config.hero()?.image ?? 'mockups/hero.png';
    return image.startsWith('/') ? image : `/${image}`;
  }
}
