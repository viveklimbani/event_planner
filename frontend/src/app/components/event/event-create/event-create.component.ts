import { Router } from '@angular/router';
import { ApiService } from './../../../service/api.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn } from "@angular/forms";

@Component({
	selector: 'app-event-create',
	templateUrl: './event-create.component.html',
	styleUrls: ['./event-create.component.css']
})
export class EventCreateComponent implements OnInit {
	submitted = false;
	eventForm!: FormGroup;
	EventProfile: any = ['Single', 'Daily', 'Weekly', 'Monthly', 'Yearly']

	constructor(
		public fb: FormBuilder,
		private router: Router,
		private ngZone: NgZone,
		private apiService: ApiService
	) {
		this.mainForm();
	}

	ngOnInit() { }

	mainForm() {
		this.eventForm = this.fb.group({
			eventname: ['', [Validators.required, Validators.maxLength(30)]],
			// description: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
			description: ['', [Validators.required]],
			startDate: ['', [Validators.required]],
			endDate: ['', [Validators.required]],
			recurrenceType: ['', [Validators.required]],
		}, { validator: this.dateLessThan('startDate', 'endDate') });
	}

	//Date validation function
	dateLessThan(from: string, to: string) {
		return (group: FormGroup): { [key: string]: any } => {
			let f = group.controls[from];
			let t = group.controls[to];
			if (f.value > t.value) {
				return {
					dates: "Date from should be less than Date to"
				};
			}
			return {};
		}
	}


	dateRangeValidator: ValidatorFn = (): {
		[key: string]: any;
	} | null => {
		console.log(this.eventForm.get("startDate")?.value, "value");
		let invalid = false;
		const from = this.eventForm && this.eventForm.get("startDate")?.value;
		const to = this.eventForm && this.eventForm.get("endDate")?.value;

		if (from && to) {
			invalid = new Date(from).valueOf() > new Date(to).valueOf();
		}
		return invalid ? { invalidRange: { from, to } } : null;
	};

	// Choose recurrenceType with select dropdown
	updateProfile(e: any) {
		this.eventForm.get('recurrenceType')?.setValue(e, {
			onlySelf: true
		})
	}

	// Getter to access form control
	get myForm() {
		return this.eventForm.controls;
	}

	onSubmit() {
		this.submitted = true;
		if (!this.eventForm.valid) {
			return false;
		} else {
			this.apiService.createEvent(this.eventForm.value).subscribe(
				(res) => {
					console.log('Event successfully created!')
					this.ngZone.run(() => this.router.navigateByUrl('/event-list'))
				}, (error) => {
					console.log(error);
				});
			return true;
		}
	}

}
