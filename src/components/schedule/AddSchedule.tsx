import { FormEventHandler, useState } from "react";
import { api } from "~/utils/api";

export const AddSchedule = () => {
  const [title, setTitle] = useState("");
  const utils = api.useContext();
  const createSchedule = api.schedule.create.useMutation({
    onSuccess: () => utils.schedule.list.invalidate(),
  });

  const handleAddSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    createSchedule.mutate({ title });
  };

  return (
    <div>
      <p>Add new schedule</p>
      <form onSubmit={handleAddSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit" disabled={createSchedule.isLoading}>
          Add
        </button>
      </form>
    </div>
  );
};
