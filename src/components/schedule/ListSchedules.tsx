import { api } from "~/utils/api";

const DeleteSchedule = ({ id }: { id: number }) => {
  const utils = api.useContext();
  const deleteSchedule = api.schedule.delete.useMutation({
    onSuccess: () => {
      utils.schedule.list.invalidate();
    },
  });

  const handleDelete = () => {
    deleteSchedule.mutate({ id });
  };

  return (
    <button onClick={handleDelete} disabled={deleteSchedule.isLoading}>
      Delete
    </button>
  );
};

const ListSchedules = () => {
  const schedules = api.schedule.list.useQuery();

  return (
    <ul>
      {schedules.data?.map((schedule) => (
        <li key={schedule.id}>
          {schedule.id}: {schedule.title}
          <DeleteSchedule id={schedule.id} />
        </li>
      ))}
    </ul>
  );
};

export default ListSchedules;
