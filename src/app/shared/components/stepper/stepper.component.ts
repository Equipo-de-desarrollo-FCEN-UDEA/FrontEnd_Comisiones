import { CdkStep, CdkStepper } from '@angular/cdk/stepper';
import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  providers: [{ provide: CdkStepper, useExisting: StepperComponent }]
})
export class StepperComponent extends CdkStepper {

  @Input()
  activeClass = 'active';

  override get selected(): CdkStep {
    return this.steps.toArray()[this.selectedIndex];
  }

  isNextButtonHidden() {
    return !(this.steps.length === this.selectedIndex + 1);
  }

}
