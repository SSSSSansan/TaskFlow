export class Task {
  id: number = 0;  // Значение по умолчанию для id
  title: string = '';  // Пустая строка как значение по умолчанию для title
  description: string = '';  // Пустая строка как значение по умолчанию для description
  category: string = '';  // Пустая строка как значение по умолчанию для category
  status: string = '';  // Пустая строка как значение по умолчанию для status
  dueDate: string = '';  // Пустая строка как значение по умолчанию для dueDate
  createdAt: string = new Date().toISOString();  // Текущая дата в ISO формате как значение по умолчанию для createdAt

  constructor(
    title?: string,
    description?: string,
    category?: string,
    status?: string,
    dueDate?: string
  ) {
    this.title = title || this.title;
    this.description = description || this.description;
    this.category = category || this.category;
    this.status = status || this.status;
    this.dueDate = dueDate || this.dueDate;
  }
}
