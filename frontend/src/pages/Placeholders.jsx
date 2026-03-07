import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const PlaceholderPage = ({ title }) => {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />
      <div className="flex pt-16">
        <Sidebar />
        <main className="flex-1 lg:ml-64 p-4 md:p-8 lg:p-12">
          <div className="max-w-4xl mx-auto mb-10 text-center mt-20">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2 tracking-tight">{title}</h1>
            <p className="text-gray-500 font-medium">This feature is coming soon.</p>
          </div>
        </main>
      </div>
    </div>
  );
};

export const Emails = () => <PlaceholderPage title="All Emails" />;
export const Contacts = () => <PlaceholderPage title="Important Contacts" />;
export const Settings = () => <PlaceholderPage title="Settings" />;
