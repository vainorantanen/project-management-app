export type AddWorkspaceState = {
    errors?: {
      title?: string[],
      description?: string[]
    };
    errorMessage?: string | null;
    successMessage?: string | null
  };

  export type AddTableState = {
    errors?: {
      title?: string[],
      description?: string[]
    };
    errorMessage?: string | null;
    successMessage?: string | null
  };


  export type AddCategoryState = {
    errors?: {
      category?: string[],
    };
    errorMessage?: string | null;
    successMessage?: string | null
  };

  export type AddTaskState = {
    errors?: {
      title?: string[],
      description?: string[]
    };
    errorMessage?: string | null;
    successMessage?: string | null
  };