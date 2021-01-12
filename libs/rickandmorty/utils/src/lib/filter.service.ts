import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TuiDestroyService } from '@taiga-ui/cdk';

@Injectable()
export class FilterService {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private destroy: TuiDestroyService,
    private fb: FormBuilder
  ) {}

  createForm(
    controlsConfig: Parameters<FormBuilder['group']>[0],
    options?: Parameters<FormBuilder['group']>[1]
  ): FormGroup {
    const { queryParams } = this.route.snapshot;

    const form = this.fb.group(
      Object.keys(controlsConfig).reduce((current, key) => {
        if (!controlsConfig[key]) {
          return current;
        }

        if (queryParams[key] === undefined) {
          return {
            ...current,
            [key]: controlsConfig[key],
          };
        }

        const controlValue = queryParams[key];
        const [, ...controlConfig] = controlsConfig[key];

        return {
          ...current,
          [key]: [controlValue, ...controlConfig],
        };
      }, {}),
      options
    );

    form.valueChanges
      .pipe(takeUntil(this.destroy), debounceTime(600))
      .subscribe((filters) => {
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: { ...filters, page: null },
          queryParamsHandling: 'merge',
        });
      });

    return form;
  }
}
