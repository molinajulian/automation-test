import {
  Component,
  OnInit,
  Input,
  Injector,
  AfterViewInit,
  Optional,
  Host,
  OnDestroy,
  ChangeDetectorRef,
  forwardRef
} from '@angular/core';
import { ControlValueAccessor, NgControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable, Subject, EMPTY } from 'rxjs';
import { FormSubmitDirective } from 'src/app/directives/form-submit.directive';
import { Chance } from 'src/app/services/chance.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-radio-input',
  templateUrl: './radio-input.component.html',
  styleUrls: ['./radio-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioInputComponent),
      multi: true
    }
  ]
})
export class RadioInputComponent implements OnInit, ControlValueAccessor, AfterViewInit, OnDestroy {
  @Input() label: string;
  @Input() errorMessage: string;
  @Input() id: string;
  @Input() options: { id: any; name: string }[] = [];
  value: string;
  formControl: NgControl;
  onChange: () => void;
  onTouch: () => void;
  showError = false;
  isRequired = false;
  idError: string;
  radioName: string;
  chance = new Chance();
  private unsubscribe$: Subject<any> = new Subject();
  submit$: Observable<Event>;

  constructor(
    private inj: Injector,
    @Optional() @Host() private form: FormSubmitDirective,
    private cdr: ChangeDetectorRef
  ) {
    this.submit$ = this.form ? this.form.submit$ : EMPTY;
    this.radioName = this.chance.getRandomString({ length: 5 });
  }

  ngOnInit() {
    this.formControl = this.inj.get(NgControl);
    this.resolveIDs();
  }

  ngAfterViewInit() {
    this.id = this.id || this.chance.getRandomString({ length: 10 });
    this.submit$.pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
      const controlErrors = this.formControl.control.errors;
      this.showError = false;
      if (controlErrors) {
        this.showError = true;
      }
    });
    if (this.formControl.control.validator) {
      const validators = this.formControl.control.validator(this.formControl.control);
      this.isRequired = !!validators.required;
    }
    this.cdr.detectChanges();
  }

  resolveIDs() {
    this.idError = `e-${this.id}`;
  }

  writeValue(value: any) {
    this.value = value || value === 0 ? value : '';
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouch = fn;
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
  }
}
