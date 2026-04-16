import { useAppSync } from "../useAppSync";
import { LIST_EVENTS } from "../../graphql/department/events";

const useDepartmentEventsList = (shortName) => {
  const { data, loading, error } = useAppSync(
    LIST_EVENTS,
    shortName
      ? {
          department: shortName,
          status: "upcoming",
          approvalStatus: "approved",
          limit: 100,
          tenantId: "biet-college",
        }
      : null
  );

  const events = data?.listEvents?.items ?? [];

  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return { sortedEvents, loading, error };
};

export default useDepartmentEventsList;