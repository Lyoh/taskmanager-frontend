import { FormGroup } from '@angular/forms';

export class FormUtils {
  constructor(private form: FormGroup) {}

  public showFieldErrors(fieldName: string): boolean {
    let field = this.getField(fieldName);
    return field.invalid && (field.touched || field.dirty);
  }

  public getFieldClass(fieldName: string) {
    return {
      'has-error': this.showFieldErrors(fieldName),
      'has-success': this.getField(fieldName).valid
    };
  }

  public getIconClass(fieldName: string) {
    return {
      'glyphicon': true,
      'form-control-feedback': true,
      'glyphicon-remove': this.showFieldErrors(fieldName),
      'glyphicon-ok': this.getField(fieldName).valid
    };
  }

  public getField(fieldName: string) {
    return this.form.get(fieldName);
  }

}
