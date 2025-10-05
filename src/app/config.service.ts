import { Injectable, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';

export interface AppConfigField {
  name: string;
  type: 'text' | 'number' | 'select';
  label?: string;
  readonly?: boolean;
  options?: string[];
}

export interface AppConfig {
  title: string;
  hero: {
    image: string;
    heading: string;
    subheading?: string;
  };
  fields: AppConfigField[];
  actions: Array<'add' | 'edit' | 'delete'>;
  mockData?: Record<string, unknown>[];
}

@Injectable({ providedIn: 'root' })
export class ConfigService {
  private readonly http = inject(HttpClient);

  readonly config = toSignal<AppConfig | null>(this.http.get<AppConfig>('/config.json'), {
    initialValue: null,
  });

  readonly title = computed(() => this.config()?.title ?? '');
  readonly hero = computed(() => this.config()?.hero);
  readonly fields = computed(() => this.config()?.fields ?? []);
  readonly actions = computed(() => this.config()?.actions ?? []);
  readonly mockData = computed(() => this.config()?.mockData ?? []);
}
