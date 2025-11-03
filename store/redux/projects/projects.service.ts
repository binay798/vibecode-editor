const getProjectList = async (userId: string) => {
  const res = await fetch("/api/playground-projects", {
    method: "GET",
    headers: {
      user_id: userId,
    },
  }).then((res) => res.json());

  return res;
};

const deleteProject = async (projectId: string) => {
  const res = await fetch("/api/playground-projects/" + projectId, {
    method: "DELETE",
  }).then((res) => res.json());

  return res;
};
export const projectServices = { getProjectList, deleteProject };
