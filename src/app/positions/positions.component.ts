import { Component, computed, effect, inject, signal } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { ConfigService, AppConfigField } from '../config.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

interface RowData {
  [key: string]: any;
}

@Component({
  selector: 'app-positions',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgIf],
  templateUrl: './positions.component.html',
  styleUrl: './positions.component.css',
})
export class PositionsComponent {
  private readonly config = inject(ConfigService);
  private readonly fb = inject(FormBuilder);

  protected readonly fields = this.config.fields;
  protected readonly actions = this.config.actions;

  // Local table data signal, seeded from config.mockData when available
  protected readonly rows = signal<RowData[]>([]);

  constructor() {
    effect(() => {
      const seed = this.config.mockData();
      if (seed && seed.length > 0) {
        this.rows.set(seed.map((r) => ({ ...r })) as RowData[]);
      }
    });
  }

  protected form: FormGroup = this.fb.group({});

  protected trackByIndex = (_: number, item: any) => item?.name ?? _;

  protected initForm(fields: AppConfigField[]): void {
    const controls: Record<string, FormControl> = {};
    for (const field of fields) {
      const control = new FormControl({ value: '', disabled: !!field.readonly });
      if (field.type === 'number') {
        control.addValidators(Validators.pattern(/^-?\d+(\.\d+)?$/));
      }
      controls[field.name] = control;
    }
    this.form = this.fb.group(controls);
  }

  protected onSubmit(): void {
    if (this.form.invalid) return;
    const newRow = { ...this.form.getRawValue() } as RowData;
    // If level is readonly and not set, auto-increment based on max existing
    if ('level' in newRow && (newRow['level'] === '' || newRow['level'] == null)) {
      const currentMax = this.rows().reduce((max, r) => Math.max(max, Number(r['level'] ?? 0)), 0);
      newRow['level'] = currentMax + 1;
    }
    this.rows.update((list) => [newRow, ...list]);
    this.form.reset();
  }

  protected onEdit(index: number): void {
    const row = this.rows()[index];
    if (!row) return;
    // Load into form; keep disabled state per field
    for (const field of this.fields()) {
      const value = row[field.name] ?? '';
      const control = this.form.get(field.name);
      if (control) control.setValue(value);
    }
    // Remove row and wait for submit to re-add
    this.rows.update((list) => list.filter((_, i) => i !== index));
  }

  protected onDelete(index: number): void {
    this.rows.update((list) => list.filter((_, i) => i !== index));
  }
}
