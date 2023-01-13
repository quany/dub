import { useDeleteProjectModal } from "components/app/modals/delete-project-modal";

export default function DeleteProject() {
  const { setShowDeleteProjectModal, DeleteProjectModal } =
    useDeleteProjectModal();
  return (
    <div className="rounded-lg border border-gray-200 bg-white">
      <DeleteProjectModal />
      <div className="flex flex-col space-y-3 p-5 sm:p-10">
        <h2 className="text-xl font-medium">删除项目</h2>
        <p className="text-sm text-gray-500">
          永久删除您的项目、自定义域和所有关联链接及其统计信息。 此操作无法撤消 - 请谨慎操作。
        </p>
      </div>
      <div className="border-b border-gray-200" />

      <div className="flex items-center justify-end px-5 py-4 sm:px-10">
        <button
          onClick={() => setShowDeleteProjectModal(true)}
          className="h-9 w-full rounded-md border border-red-600 bg-red-600 text-sm text-white transition-all duration-150 ease-in-out hover:bg-white hover:text-red-600 focus:outline-none sm:w-32"
        >
          删除项目
        </button>
      </div>
    </div>
  );
}
