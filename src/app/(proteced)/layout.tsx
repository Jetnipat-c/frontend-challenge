import Navbar from "@components/Navbar";
import WithAuth from "@hoc/WithAuth";

function AppointmentLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <Navbar />
      <div className="container">{children}</div>
    </section>
  );
}

export default WithAuth(AppointmentLayout);
