import { NavDashboard } from './_components/NavDashboard';

export const metadata = {
  title: 'Dashboard Dresscode App',
  description: 'Generated by create Dashboard Dresscode app',
};

export default function DashboardLayout({ children }) {
  return (
    <div className="flex gap-7">
      <NavDashboard />
      <div className="flex-grow">{children}</div>
    </div>
  );
}
