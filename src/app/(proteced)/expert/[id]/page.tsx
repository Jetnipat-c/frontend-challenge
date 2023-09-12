import ExpertDetailView from "@views/Expert/ExpertDetail";

export default function ExpertDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div>
      <ExpertDetailView id={params.id} />
    </div>
  );
}
