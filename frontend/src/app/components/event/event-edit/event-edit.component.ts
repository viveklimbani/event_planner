import { Component, OnInit } from '@angular/core';
import { Event } from './../../../model/event';
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from './../../../service/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
	selector: 'app-event-edit',
	templateUrl: './event-edit.component.html',
	styleUrls: ['./event-edit.component.css']
})
export class EventEditComponent implements OnInit {

	submitted = false;
	editForm!: FormGroup;
	eventData!: Event[];
	EventProfile: any = ['Single', 'Daily', 'Weekly', 'Monthly', 'Yearly']

	constructor(
		public fb: FormBuilder,
		private actRoute: ActivatedRoute,
		private apiService: ApiService,
		private router: Router
	) { }

	ngOnInit(): void {
		this.updateEvent();
		let id = this.actRoute.snapshot.paramMap.get('id');
		this.getEvent(id);
		this.editForm = this.fb.group({
			eventname: ['', [Validators.required]],
			description: ['', [Validators.required]],
			startDate: ['', [Validators.required]],
			endDate: ['', [Validators.required]],
			recurrenceType: ['', [Validators.required]],
		})
	}

	// Choose options with select-dropdown
	updateProfile(e: any) {
		this.editForm.get('recurrenceType')?.setValue(e, {
			onlySelf: true
		})
	}

	// Getter to access form control
	get myForm() {
		return this.editForm.controls;
	}

	getEvent(id: string | null) {
		this.apiService.getEvent(id).subscribe(data => {
			this.editForm.setValue({
				eventname: data['eventname'],
				description: data['description'],
				startDate: data['startDate'],
				endDate: data['endDate'],
				recurrenceType: data['recurrenceType'],
			});
		});
	}

	updateEvent() {
		this.editForm = this.fb.group({
			eventname: ['', [Validators.required]],
			description: ['', [Validators.required]],
			startDate: ['', [Validators.required]],
			endDate: ['', [Validators.required]],
			recurrenceType: ['', [Validators.required]],
		})
	}

	onSubmit() {
		// debugger;
		this.submitted = true;
		if (!this.editForm.valid) {
			return false;
		} else {
			if (window.confirm('Are you sure?')) {
				let id = this.actRoute.snapshot.paramMap.get('id');
				this.apiService.updateEvent(id, this.editForm.value)
					.subscribe(res => {
						this.router.navigateByUrl('/event-list');
						console.log('Event updated successfully!')
					}, (error) => {
						console.log(error)
					})
			}
			return true;
		}
	}
}
