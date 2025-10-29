
'use client';

import Image from 'next/image';
import { useState } from 'react';

const team2025 = [
  { name: 'Muhammad Ahmad Bhatti', role: 'President', imageUrl: 'https://drive.google.com/uc?export=view&id=1I8ZWzArSMM2rzX2O_ApSJ5TTZyh2IJbJ' },
  { name: 'Muhammad Zeeshan Ali', role: 'Vice President', imageUrl: 'https://drive.google.com/uc?export=view&id=180XP8HA-yOT2MB6wW3PxqdLlcSmnVIgH' },
  { name: 'Hamna Javaid', role: 'Female Vice President', imageUrl: 'https://drive.google.com/uc?export=view&id=1cKTIIkVbtcV1LiIqTsCQ-nnaxsxR2N59' },
  { name: 'Muhammad Usman Ghani', role: 'Secretary General', imageUrl: 'https://drive.google.com/uc?export=view&id=1Zo30EfoFnz7IcPMEpnKAyt11hADZnWb5' },
  { name: 'Maryam Naveed', role: 'General Secretary TechVerse / Supervisor Team Registrations', imageUrl: 'https://drive.google.com/uc?export=view&id=1I-ZTn97SPHHJm4sWI_RYWTl8wObtdiEW' },
  { name: 'HUSNAIN MEHMOOD', role: 'Director General', imageUrl: 'https://drive.google.com/uc?export=view&id=1ctyX4-b0uSzIRZB_Hgww61faPciLYCgQ' },
  { name: 'Muhammad Sheharyar Shahzad Rana', role: 'Director Registration', imageUrl: 'https://drive.google.com/uc?export=view&id=1CxENenoCq4o7ww8CYOtvAiNwVP2X-wBX' },
  { name: 'Hashir Irfan', role: 'Director Management', imageUrl: 'https://drive.google.com/uc?export=view&id=1rZsXd8b7KKPD6LEJepbv4WLbk8eH_NMN' },
  { name: 'Muhammad Ali Haider', role: 'Director IT', imageUrl: 'https://drive.google.com/uc?export=view&id=1cCw75b1lHOByQRmQGIIMGcmeKS8US8u0' },
  { name: 'Areeba Khurram', role: 'Director Creatives', imageUrl: 'https://drive.google.com/uc?export=view&id=14hstqoYL4yv7aixwpnb0OtqncaYHHicZ' },
  { name: 'Muhammad Saad Ahmed', role: 'Director Protocols', imageUrl: 'https://drive.google.com/uc?export=view&id=1nNZxprhaIm8w228yUbhEMs8bSZo_bYmS' },
  { name: 'Ajwa Rasheed', role: 'Media Secretary', imageUrl: 'https://drive.google.com/uc?export=view&id=1izq02a7Tjf_hWlER0IF-WQ2HD880UUqN' },
  { name: 'Abdul Wahab', role: 'Web Development Lead', imageUrl: 'https://drive.google.com/uc?export=view&id=1TaXHM1Ixhkma4Oa6L9z1MasXgaO6h160' },
  { name: 'Zainab Salman', role: 'Clue Mania Module Lead', imageUrl: 'https://drive.google.com/uc?export=view&id=1wwYFjm6k-pdOOT4uH33A0xYblg55kovx' },
  { name: 'Asad Ahmed Qureshi', role: 'Fifa Module Head', imageUrl: 'https://drive.google.com/uc?export=view&id=1MMcCdvb12o-5Pb1nTPBlUDP6daszswG8' },
  { name: 'Atif hanif', role: 'Speed programming module head', imageUrl: 'https://drive.google.com/uc?export=view&id=1DxVlbOTAmntrBwfJZHwb7DlNZY6DTHBm' },
  { name: 'Muhammad Zain', role: 'Tekken Head', imageUrl: 'https://drive.google.com/uc?export=view&id=1I32zyyfxX_d7cBnN3pk0gbREofk0nNOe' },
  { name: 'Azam Ali', role: 'Supervisor', imageUrl: 'https://drive.google.com/uc?export=view&id=1klcqkX6EYm4p7Gu1uhc0WDIDfKVP-15P' },
  { name: 'Muhammad Umar Javed', role: 'Supervisor', imageUrl: 'https://drive.google.com/uc?export=view&id=13GQ5x4O5RmAydji91TqxHEk1r08zskhK' },
];

const president = team2025.filter(m => m.role.toLowerCase().includes('president'));
const executives = team2025.filter(m =>
  m.role.toLowerCase().includes('vice president') ||
  m.role.toLowerCase().includes('secretary general') ||
  m.role.toLowerCase().includes('general secretary')
);
const directors = team2025.filter(m => m.role.toLowerCase().includes('director') || m.role.toLowerCase().includes('lead') || m.role.toLowerCase().includes('head') || m.role.toLowerCase().includes('media secretary') || m.role.toLowerCase().includes('module head'));
const supervisors = team2025.filter(m => m.role.toLowerCase().includes('supervisor'));

function TeamGroup({ title, members, onImageClick }: { title: string, members: typeof team2025, onImageClick: (url: string, name: string) => void }) {
  if (!members.length) return null;
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-navy-800 mb-6 text-center">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {members.map((member, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center">
            <button
              className="w-36 h-36 mb-4 relative rounded-full overflow-hidden border-4 border-blue-200 focus:outline-none"
              style={{ padding: 0, background: 'none', border: 'none' }}
              onClick={() => onImageClick(member.imageUrl, member.name)}
              aria-label={`View ${member.name}'s photo`}
            >
              <Image
                src={member.imageUrl}
                alt={member.name}
                width={144}
                height={144}
                className="object-cover w-full h-full"
              />
            </button>
            <h3 className="text-xl font-bold text-navy-800 mb-1">{member.name}</h3>
            <p className="text-blue-600 font-medium">{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Team2025Page() {
  const [modalImage, setModalImage] = useState<{ url: string; name: string } | null>(null);

  const handleImageClick = (url: string, name: string) => {
    setModalImage({ url, name });
  };

  const closeModal = () => setModalImage(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-navy-50 py-16">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-navy-900 mb-8">
          Techverse 2025 Team
        </h1>
        <p className="text-center text-lg text-navy-700 mb-12">
          Meet the legacy team that made Techverse 2025 a success!
        </p>
        <TeamGroup title="President" members={president} onImageClick={handleImageClick} />
        <TeamGroup title="Executives" members={executives} onImageClick={handleImageClick} />
        <TeamGroup title="Directors & Leads" members={directors} onImageClick={handleImageClick} />
        <TeamGroup title="Supervisors" members={supervisors} onImageClick={handleImageClick} />
      </div>

      {/* Modal for image view */}
      {modalImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg p-4 shadow-xl relative max-w-full max-h-full flex flex-col items-center"
            style={{ minWidth: 320, minHeight: 320 }}
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-2xl font-bold focus:outline-none"
              onClick={closeModal}
              aria-label="Close image view"
            >
              &times;
            </button>
            <Image
              src={modalImage.url}
              alt={modalImage.name}
              width={400}
              height={400}
              className="object-contain rounded-lg max-w-[80vw] max-h-[70vh]"
            />
            <div className="mt-2 text-center text-lg font-semibold text-navy-800">{modalImage.name}</div>
          </div>
        </div>
      )}
    </div>
  );
}
