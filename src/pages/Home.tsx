import { useState } from "react";

export const Home = () => {
  const [uploaded, setUploaded] = useState<File>();
  return (
    <div className="flex flex-col gap-4 h-screen">
      <Header />
      <main className="grow p-4">
        {uploaded ? <ArtifactDetails /> : <UploadArtifact />}
      </main>
    </div>
  );
};

export const Header = () => {
  return (
    <header className="p-6">
      <h1 className="text-center text-2xl font-bold">Elev8 AI</h1>
    </header>
  );
};

export const ArtifactDetails = () => {
  return (
    <div className="grid grid-cols-2 p-4 pt-0 gap-4 ">
      <section className="col-span-1 border border-primary rounded-2xl p-4">
        Summary
      </section>
      <section className="col-span-1 border border-primary rounded-2xl p-4">
        chat
      </section>
    </div>
  );
};

export const UploadArtifact = () => {
  return <div className="rounded-2xl p-4 border border-primary"></div>;
};
