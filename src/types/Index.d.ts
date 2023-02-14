export type todoType = {
  id: string;
  status: todoStatusType;
  title: string;
  detail: string;
  createdAt: Date;
  updateAt: Date;
  deadline: Date;
}

export type deadlineType = "year" | "month" | "date" | "hours" | "minutes";

export type todoStatusType = "" | "notStarted" | "doing" | "done";

export type sortValueType = "none" | "desc" | "asc";