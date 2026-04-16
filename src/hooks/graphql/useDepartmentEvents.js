import { useAppSync } from "../useAppSync";
import { LIST_EVENTS } from "../../graphql/department/events";

const isPinned = (val) => {
  if (val === true || val === 1 || val === "1") return true;
  if (typeof val === "string") {
    return val.toLowerCase() === "true";
  }
  return false;
};

const useDepartmentEvents = (deptId) => {
  const { data, loading, error } = useAppSync(LIST_EVENTS, {
    department: deptId,
    status: "upcoming",
    approvalStatus: "approved",
    limit: 10,
    tenantId: "biet-college",
  });

  const items = data?.listEvents?.items ?? [];

  const pinnedEvents = items.filter((e) => isPinned(e.pinned));
  const normalEvents = items.filter((e) => !isPinned(e.pinned));

  return {
    pinnedEvents,
    normalEvents,
    loading,
    error,
  };
};

export default useDepartmentEvents;