import {Component, OnInit} from '@angular/core';
import {NzMessageService, UploadChangeParam} from 'ng-zorro-antd';
import {FormControl} from "@angular/forms";
import {AppService} from "./app.service";
import {IQuarterStudentGrades} from "./app.interface";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AppService]
})
export class AppComponent implements OnInit {
  public inputFormValue = new FormControl('');
  public fileUploadURL = 'http://localhost:5000/api/submitByFile';
  public quarterStudentsGrades: IQuarterStudentGrades[] = [];

  constructor(private msg: NzMessageService, private appService: AppService) {}

  ngOnInit(): void {
    this.loadGrades();
  }

  handleChange({ file }: UploadChangeParam): void {
    const status = file.status;

    if (status === 'done') {
      this.msg.success(`${file.name} file uploaded successfully. Grades has been submitted`);
      this.loadGrades();
    } else if (status === 'error') {
      this.msg.error(`${file.name} file upload failed.`);
    }
  }

  public async submit() {
    try {
      await this.appService.submitGradesByText(this.inputFormValue.value);
      this.msg.success('Grades has been saved.');
      this.loadGrades();
    } catch (e) {
      this.msg.error(e.error);
    } finally {
      this.inputFormValue.reset();
    }
  }

  public async deleteQuarter(quarter: string) {
    await this.appService.deleteQuarter(quarter);
    await this.loadGrades();
    this.msg.success(`${quarter} has been deleted.`)
  }

  private loadGrades() {
    this.appService.getGrades().then(data => this.quarterStudentsGrades = data);
  }

}
