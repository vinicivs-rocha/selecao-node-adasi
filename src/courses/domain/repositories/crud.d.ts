export interface ICrudRepository {
  create(courseDto: CreateCourseDto): Promise<Course>;
  list(): Promise<Course[]>;
  find(id: string): Promise<Course>;
  update(id: string, courseDto: UpdateCourseDto): Promise<Course>;
  delete(id: string): Promise<string>;
}
