export interface IQuarterStudentGrades {
  _id: string;
  studentsWithGrades: IStudentWithGrades[];
}

export interface IStudentWithGrades {
  student: string;
  grade: number;
}
