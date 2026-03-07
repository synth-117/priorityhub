import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const ImportantContacts = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />
      <div className="flex pt-16">
        <Sidebar />
        <main className="flex-1 lg:ml-64 p-4 md:p-8 lg:p-12">
          <h1 className="text-3xl font-extrabold text-gray-900">Important Contacts</h1>
          <p className="mt-4 text-gray-600">Manage VIPs feature is coming soon.</p>
        </main>
      </div>
    </div>
  );
};

export default ImportantContacts;
